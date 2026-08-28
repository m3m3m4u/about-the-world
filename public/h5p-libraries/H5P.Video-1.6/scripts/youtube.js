/** @namespace H5P */
H5P.VideoYouTube = (function ($) {

  /**
   * YouTube video player for H5P.
   *
   * @class
   * @param {Array} sources Video files to use
   * @param {Object} options Settings for the player
   * @param {Object} l10n Localization strings
   */
  function YouTube(sources, options, l10n) {
    var self = this;

    var player;
    var playbackRate = 1;
    var id = 'h5p-youtube-' + numInstances;
    numInstances++;
    var ratio = 9 / 16;
    var $wrapper = $('<div/>', {
      'class': 'h5p-youtube-container',
      'style': 'position: relative; width: 100%; height: 100%; max-width: 100%; max-height: 100%; display: flex; align-items: center; justify-content: center; margin: 0 auto; overflow: hidden;'
    });
    var $placeholder = $('<div />', {
      'class': 'h5p-youtube-placeholder',
      'style': 'position: relative; width: 100%; height: 100%; max-width: 100%; max-height: 100%; aspect-ratio: 16 / 9; margin: auto; display: flex; align-items: center; justify-content: center;',
      'html': '<div id="' + id + '" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>'
    }).appendTo($wrapper);

    var fixIframe = function () {
      try {
        var iframe = (player && player.getIframe && player.getIframe()) ||
                     (player && player.g) ||
                     (player && player.a) ||
                     (player && player.h) ||
                     document.getElementById(id) ||
                     $wrapper.find('iframe')[0];
        if (iframe && iframe.style) {
          iframe.style.position = 'absolute';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.border = '0';
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
          iframe.setAttribute('allowfullscreen', '1');
        }
      } catch (e) {}
    };

    /**
     * Use the YouTube API to create a new player
     *
     * @private
     */
    var create = function () {
      if (player !== undefined) {
        return;
      }

      if (window.YT === undefined || window.YT.Player === undefined) {
        // Load API first
        loadAPI(create);
        return;
      }

      var width = $wrapper.width() || 640;
      if (width < 200) {
        width = 200;
      }

      var loadCaptionsModule = true;
      var videoPath = (sources && sources[0] && sources[0].path) ? sources[0].path : '';
      var videoId = getId(videoPath);

      if (!videoId) {
        self.trigger('error', (l10n && l10n.invalidYtId) ? l10n.invalidYtId : 'Invalid YouTube ID');
        return;
      }

      try {
        player = new YT.Player(id, {
          width: '100%',
          height: '100%',
          videoId: videoId,
          playerVars: {
            origin: ORIGIN,
            enablejsapi: 1,
            autoplay: 0,
            controls: options.controls ? 1 : 0,
            disablekb: options.controls ? 0 : 1,
            fs: 1,
            loop: options.loop ? 1 : 0,
            playlist: options.loop ? videoId : undefined,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            wmode: "opaque",
            start: Math.floor(options.startAt || 0),
            playsinline: 1,
            modestbranding: 1
          },
          events: {
            onReady: function () {
              fixIframe();
              self.trigger('ready');
              self.trigger('loaded');

              if (!options.autoplay) {
                self.toPause = true;
              }
              
              if (options.deactivateSound) {
                self.mute();
              }
            },
            onApiChange: function () {
              if (loadCaptionsModule) {
                loadCaptionsModule = false;
                try {
                  player.loadModule('captions');
                } catch (err) {}
              }

              var trackList;
              try {
                trackList = player.getOption('captions', 'tracklist');
              } catch (err) {}

              if (trackList && trackList.length) {
                var trackOptions = [];
                for (var i = 0; i < trackList.length; i++) {
                  if (H5P.Video && H5P.Video.LabelValue) {
                    trackOptions.push(new H5P.Video.LabelValue(trackList[i].displayName, trackList[i].languageCode));
                  }
                }
                self.trigger('captions', trackOptions);
              }
            },
            onStateChange: function (state) {
              fixIframe();
              if (state && state.data > -1 && state.data < 4) {
                if (self.toPause) {
                  if (H5P.Video && state.data === H5P.Video.BUFFERING) {
                    delete self.toPause;
                  } else {
                    self.pause();
                  }
                }

                if (H5P.Video && H5P.Video.IE11_PLAYBACK_RATE_FIX && state.data === H5P.Video.PLAYING && playbackRate !== 1) {
                  try {
                    player.setPlaybackRate(1);
                    player.setPlaybackRate(playbackRate);
                  } catch (e) {}
                }

                self.trigger('stateChange', state.data);
              }
            },
            onPlaybackQualityChange: function (quality) {
              if (quality) self.trigger('qualityChange', quality.data);
            },
            onPlaybackRateChange: function (rate) {
              if (rate) self.trigger('playbackRateChange', rate.data);
            },
            onError: function (error) {
              var message;
              var code = error ? error.data : 0;
              switch (code) {
                case 2:
                  message = (l10n && l10n.invalidYtId) ? l10n.invalidYtId : 'Invalid YouTube ID.';
                  break;
                case 100:
                  message = (l10n && l10n.unknownYtId) ? l10n.unknownYtId : 'Unable to find video with the given YouTube ID.';
                  break;
                case 101:
                case 150:
                  message = (l10n && l10n.restrictedYt) ? l10n.restrictedYt : 'The owner of this video does not allow it to be embedded.';
                  break;
                default:
                  message = ((l10n && l10n.unknownError) ? l10n.unknownError : 'Unknown error') + ' ' + code;
                  break;
              }
              self.trigger('error', message);
            }
          }
        });
      } catch (err) {
        console.error('Error creating YouTube player instance:', err);
      }

      fixIframe();
      setTimeout(fixIframe, 50);
      setTimeout(fixIframe, 200);
      setTimeout(fixIframe, 600);
    };

    if (navigator.userAgent.match(/iPad|iPhone|iPod/i)) {
      self.pressToPlay = true;
    } else {
      try {
        if (document.featurePolicy && document.featurePolicy.allowsFeature('autoplay') === false) {
          self.pressToPlay = true;
        }
      } catch (err) {}
    }

    self.appendTo = function ($container) {
      $container.addClass('h5p-youtube').append($wrapper);
      create();
      setTimeout(create, 50);
      setTimeout(create, 200);
      setTimeout(create, 500);
    };

    self.getQualities = function () {
      if (!player || typeof player.getAvailableQualityLevels !== 'function') {
        return;
      }
      var qualities = player.getAvailableQualityLevels();
      if (!qualities || !qualities.length) {
        return;
      }
      var results = [];
      for (var i = 0; i < qualities.length; i++) {
        var quality = qualities[i];
        results.push({
          name: quality,
          label: LABELS[quality] !== undefined ? LABELS[quality] : (quality || 'Unknown')
        });
      }
      return results;
    };

    self.getQuality = function () {
      if (!player || typeof player.getPlaybackQuality !== 'function') {
        return;
      }
      var quality = player.getPlaybackQuality();
      return quality === 'unknown' ? undefined : quality;
    };

    self.setQuality = function (quality) {
      if (!player || typeof player.setPlaybackQuality !== 'function') {
        return;
      }
      player.setPlaybackQuality(quality);
    };

    self.play = function () {
      if (!player || typeof player.playVideo !== 'function') {
        self.on('ready', self.play);
        create();
        return;
      }
      try {
        player.playVideo();
      } catch (e) {}
    };

    self.pause = function () {
      delete self.toPause;
      self.off('ready', self.play);
      if (!player || typeof player.pauseVideo !== 'function') {
        return;
      }
      try {
        player.pauseVideo();
      } catch (e) {}
    };

    self.seek = function (time) {
      if (!player || typeof player.seekTo !== 'function') {
        return;
      }
      try {
        player.seekTo(time, true);
      } catch (e) {}
    };

    self.resetPlayback = function (time) {
      options.startAt = time;
      if (player) {
        try {
          if (typeof player.getPlayerState === 'function' && H5P.Video && player.getPlayerState() === H5P.Video.PLAYING) {
            player.pauseVideo();
            self.trigger('stateChange', H5P.Video.PAUSED);
          }
          if (typeof player.destroy === 'function') {
            player.destroy();
          }
        } catch (e) {}
        player = undefined;
      }
      create();
    };

    self.getCurrentTime = function () {
      if (!player || typeof player.getCurrentTime !== 'function') {
        return 0;
      }
      try {
        return player.getCurrentTime() || 0;
      } catch (e) {
        return 0;
      }
    };

    self.getDuration = function () {
      if (!player || typeof player.getDuration !== 'function') {
        return 0;
      }
      try {
        return player.getDuration() || 0;
      } catch (e) {
        return 0;
      }
    };

    self.getBuffered = function () {
      if (!player || typeof player.getVideoLoadedFraction !== 'function') {
        return 0;
      }
      try {
        return (player.getVideoLoadedFraction() || 0) * 100;
      } catch (e) {
        return 0;
      }
    };

    self.mute = function () {
      if (!player || typeof player.mute !== 'function') {
        return;
      }
      try {
        player.mute();
      } catch (e) {}
    };

    self.unMute = function () {
      if (!player || typeof player.unMute !== 'function') {
        return;
      }
      try {
        player.unMute();
      } catch (e) {}
    };

    self.isMuted = function () {
      if (!player || typeof player.isMuted !== 'function') {
        return false;
      }
      try {
        return player.isMuted();
      } catch (e) {
        return false;
      }
    };

    self.isLoaded = function () {
      if (!player || typeof player.getPlayerState !== 'function') {
        return false;
      }
      try {
        return player.getPlayerState() === 5;
      } catch (e) {
        return false;
      }
    };

    self.getVolume = function () {
      if (!player || typeof player.getVolume !== 'function') {
        return 100;
      }
      try {
        return player.getVolume();
      } catch (e) {
        return 100;
      }
    };

    self.setVolume = function (level) {
      if (!player || typeof player.setVolume !== 'function') {
        return;
      }
      try {
        player.setVolume(level);
      } catch (e) {}
    };

    self.getPlaybackRates = function () {
      if (!player || typeof player.getAvailablePlaybackRates !== 'function') {
        return [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
      }
      try {
        var rates = player.getAvailablePlaybackRates();
        return (rates && rates.length) ? rates : [1];
      } catch (e) {
        return [1];
      }
    };

    self.getPlaybackRate = function () {
      if (!player || typeof player.getPlaybackRate !== 'function') {
        return 1;
      }
      try {
        return player.getPlaybackRate() || 1;
      } catch (e) {
        return 1;
      }
    };

    self.setPlaybackRate = function (newPlaybackRate) {
      if (!player || typeof player.setPlaybackRate !== 'function') {
        return;
      }
      try {
        playbackRate = Number(newPlaybackRate);
        player.setPlaybackRate(playbackRate);
      } catch (e) {}
    };

    self.setCaptionsTrack = function (track) {
      if (!player || typeof player.setOption !== 'function') {
        return;
      }
      try {
        player.setOption('captions', 'track', track ? { languageCode: track.value } : {});
      } catch (e) {}
    };

    self.getCaptionsTrack = function () {
      if (!player || typeof player.getOption !== 'function') {
        return null;
      }
      try {
        var track = player.getOption('captions', 'track');
        return (track && track.languageCode && H5P.Video && H5P.Video.LabelValue) ? new H5P.Video.LabelValue(track.displayName, track.languageCode) : null;
      } catch (e) {
        return null;
      }
    };

    self.on('resize', function () {
      if (!$wrapper.is(':visible')) {
        return;
      }

      if (!player) {
        create();
        return;
      }

      $wrapper.css({
        width: '100%',
        height: '100%'
      });

      var width = $wrapper[0].clientWidth || $wrapper.width() || 640;
      var height = options.fit ? ($wrapper[0].clientHeight || (width * (9 / 16))) : (width * (9 / 16));

      if (height > 0) {
        if (player && typeof player.setSize === 'function') {
          try {
            player.setSize(width, height);
          } catch (e) {}
        }
      }
      fixIframe();
    });
  }

  YouTube.canPlay = function (sources) {
    if (!sources || !sources[0]) return false;
    var path = typeof sources[0] === 'string' ? sources[0] : sources[0].path;
    return !!getId(path);
  };

  var getId = function (url) {
    if (!url) return undefined;
    if (typeof url !== 'string') {
      if (Array.isArray(url) && url[0] && url[0].path) url = url[0].path;
      else return undefined;
    }
    url = url.trim();
    var match = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?(?:[^\s"\'<>]*&)?v=|shorts\/))([A-Za-z0-9_-]{11})/i);
    if (match && match[1]) {
      return match[1];
    }
    var fallback = url.match(/(?:v=|\/)([A-Za-z0-9_-]{11})(?:[&?]|$)/);
    if (fallback && fallback[1]) {
      return fallback[1];
    }
    return undefined;
  };

  var loadAPI = function (loaded) {
    if (window.YT && window.YT.Player) {
      setTimeout(loaded, 0);
      return;
    }

    if (window.onYouTubeIframeAPIReady !== undefined) {
      var original = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = function (id) {
        try { original(id); } catch(e) {}
        try { loaded(id); } catch(e) {}
      };
    } else {
      window.onYouTubeIframeAPIReady = loaded;
      var existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0] || document.head;
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
      }
    }
  };

  var LABELS = {
    highres: '2160p',
    hd2160: '2160p',
    hd1440: '1440p',
    hd1080: '1080p',
    hd720: '720p',
    large: '480p',
    medium: '360p',
    small: '240p',
    tiny: '144p',
    auto: 'Auto'
  };

  var numInstances = 0;

  var ORIGIN = undefined;
  try {
    if (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null' && window.location.origin.indexOf('http') === 0) {
      ORIGIN = window.location.origin;
    } else if (typeof window !== 'undefined' && window.parent && window.parent.location && window.parent.location.origin && window.parent.location.origin !== 'null' && window.parent.location.origin.indexOf('http') === 0) {
      ORIGIN = window.parent.location.origin;
    }
  } catch (e) {}

  return YouTube;
})(H5P.jQuery);

// Register video handler
H5P.videoHandlers = H5P.videoHandlers || [];
if (H5P.videoHandlers.indexOf(H5P.VideoYouTube) === -1) {
  H5P.videoHandlers.push(H5P.VideoYouTube);
}
