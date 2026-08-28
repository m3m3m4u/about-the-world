'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/types';

export interface Translations {
  platformTitle: string;
  platformSubtitle: string;
  portalStatus: string;
  docLink: string;
  navHome: string;
  navGeography: string;
  navCountries: string;
  navMiddleEast: string;
  navPresidents: string;
  navUsStates: string;
  navContentsToggle: string;
  welcomeHeading: string;
  welcomeText: string;
  exploreTopicsTitle: string;
  exploreTopicsSubtitle: string;
  h5pTitle: string;
  btnRestart: string;
  btnFullscreen: string;
  btnExitFullscreen: string;
  stateSavedNotice: string;
  resetModalTitle: string;
  resetModalDesc: string;
  btnCancel: string;
  btnConfirmReset: string;
  handbookTitle: string;
  handbookSubtitle: string;
  checklistTitle: string;
  check1: string;
  check2: string;
  check3: string;
  check4: string;
  check5: string;
  closeHandbook: string;
  footerCopyright: string;
  footerImprint: string;
  footerPrivacy: string;
  footerCookieSettings: string;
  pdfHandbookBadge: string;
  loading: string;
  noResults: string;
  subChaptersTitle: string;
  relatedExercises: string;
  backToOverview: string;
  exerciseHeading: string;
  scoreLabel: string;
  scorePoints: string;
  scoreCompleted: string;

  // ── Auth & Login ──────────────────────────────────────────────
  loginBtn: string;
  logoutBtn: string;
  roleTeacher: string;
  roleStudent: string;
  roleAdmin: string;
  menuDashboard: string;
  menuProgress: string;
  menuAdmin: string;
  menuTopics: string;
  loginModalTitle: string;
  loginRolePrompt: string;
  loginRoleTeacherBtn: string;
  loginRoleStudentBtn: string;
  teacherLoginTitle: string;
  teacherRegisterTitle: string;
  studentLoginTitle: string;
  studentLoginSubtitle: string;
  emailOrUsername: string;
  email: string;
  password: string;
  minCharsHint: string;
  studentCode: string;
  studentCodePlaceholder: string;
  btnBack: string;
  btnLoginSubmit: string;
  btnLoginLoading: string;
  btnRegisterSubmit: string;
  btnRegisterLoading: string;
  noAccountPrompt: string;
  registerNowLink: string;
  alreadyHaveAccountPrompt: string;
  loginNowLink: string;
  loginErrorDefault: string;
  loginNetworkError: string;

  // ── Teacher Assigner ──────────────────────────────────────────
  teacherBadge: string;
  assignedTo: string;
  notAssignedYet: string;
  btnAssignToStudents: string;
  assignModalTitle: string;
  noClassesYet: string;
  goToDashboardLink: string;
  selectClassesPrompt: string;
  selectAll: string;
  selectNone: string;
  classItemLabel: string;
  studentsCountLabel: string;
  btnSaveAssignment: string;
  btnSaving: string;
  assignmentSavedSuccess: string;
  assignmentClearedSuccess: string;

  // ── Confirm Modal ─────────────────────────────────────────────
  btnConfirm: string;
  btnDeleting: string;

  // ── Student Progress Page ─────────────────────────────────────
  myProgressTitle: string;
  studentCodeLabel: string;
  classLabel: string;
  assignedTasksForClass: string;
  completedOfTotalTasks: string;
  noAssignedTasksYet: string;
  exerciseNumber: string;
  alreadyCompleted: string;
  openTask: string;
  practiceAgain: string;
  startExercise: string;
  allPracticedExercises: string;
  noPracticedExercisesYet: string;
  lastWorkedOn: string;
  btnOpen: string;
  allTopicsLink: string;
  progressLoading: string;

  // ── Teacher Dashboard ─────────────────────────────────────────
  teacherDashboardTitle: string;
  loggedInAs: string;
  btnChangePassword: string;
  totalStudentsCard: string;
  totalClassesCard: string;
  totalSolvedTasksCard: string;
  createStudentsTitle: string;
  classNameLabel: string;
  classNamePlaceholder: string;
  countCodesLabel: string;
  btnCreateAccounts: string;
  btnCreating: string;
  accountsCreatedSuccess: string;
  classManagementTitle: string;
  studentsCount: string;
  assignedTasksCount: string;
  btnAssignTasksForClass: string;
  btnRenameClass: string;
  btnDeleteClass: string;
  studentsAndResultsTitle: string;
  allClassesOption: string;
  btnCopyCodes: string;
  btnDownloadCSV: string;
  copiedNotice: string;
  thNumber: string;
  thStudentCode: string;
  thClass: string;
  thSolvedTasks: string;
  thLastActive: string;
  thActions: string;
  noStudentsInFilter: string;
  noExercisesSolvedYet: string;
  passwordModalTitle: string;
  currentPasswordLabel: string;
  newPasswordLabel: string;
  confirmNewPasswordLabel: string;
  passwordMismatchError: string;
  passwordChangedSuccess: string;
  deleteStudentTitle: string;
  deleteStudentConfirm: string;
  deleteClassTitle: string;
  deleteClassConfirm: string;
  renameClassTitle: string;
  newClassNameLabel: string;
  btnRenameSubmit: string;
  searchExercisePlaceholder: string;
  selectedCountLabel: string;

  // ── Admin Page ────────────────────────────────────────────────
  adminDashboardTitle: string;
  adminDashboardDesc: string;
  adminRegisteredTeachers: string;
  adminTotalStudents: string;
  adminTotalTasks: string;
  adminRegisteredDate: string;
  adminResetPasswordBtn: string;
  adminDeleteTeacherBtn: string;
  adminDeleteTeacherTitle: string;
  adminDeleteTeacherConfirm: string;
  adminNewPasswordPlaceholder: string;
  adminSetNewPasswordBtn: string;
  adminPasswordResetSuccess: string;
  adminTeacherDeletedSuccess: string;
  adminNoTeachersYet: string;

  // ── Was ist neu / What's New ──────────────────────────────────
  whatsNewTitle: string;
  featureLayout: string;
  featureSpeed: string;
  featureStudents: string;
  featureTasks: string;
  featurePrivacy: string;
}

export const translations: Record<Language, Translations> = {
  de: {
    platformTitle: 'About the World',
    platformSubtitle: 'Geographie, Länder der Erde & Interaktive Übungen',
    portalStatus: 'Online',
    docLink: 'H5P Entwickler-Handbuch & Reparaturanleitung',
    navHome: 'Startseite',
    navGeography: 'Geographie',
    navCountries: 'Länder der Erde',
    navMiddleEast: 'Der Nahostkonflikt',
    navPresidents: 'US-Präsidenten',
    navUsStates: 'US-Bundesstaaten',
    navContentsToggle: 'Inhalte',
    welcomeHeading: 'Herzlich Willkommen auf about-the-world.org',
    welcomeText: 'Hier findest du zahlreiche Inhalte und interaktive Übungen rund um das Thema Geographie, Weltgeschichte und Politik. Lerne alles über die Länder und Kulturen dieser Erde!',
    exploreTopicsTitle: 'Themenbereiche',
    exploreTopicsSubtitle: 'Wähle einen Fachbereich aus, um Lektionen und die zugehörigen interaktiven Übungen zu starten.',
    h5pTitle: 'Interaktive Übung (H5P)',
    btnRestart: 'Neu starten',
    btnFullscreen: 'Vollbild',
    btnExitFullscreen: 'Vollbild beenden',
    stateSavedNotice: 'Letzter Bearbeitungsstand automatisch wiederhergestellt',
    resetModalTitle: 'Übungsstand zurücksetzen?',
    resetModalDesc: 'Möchten Sie Ihren bisherigen Bearbeitungsstand für dieses Modul wirklich löschen und von vorne beginnen?',
    btnCancel: 'Abbrechen',
    btnConfirmReset: 'Ja, zurücksetzen',
    handbookTitle: 'H5P Entwickler-Handbuch & Reparaturanleitung',
    handbookSubtitle: 'Technischer Leitfaden für H5P-Pakete, Video- & YouTube-Fixes und State-Restoration',
    checklistTitle: '7. Checkliste für das nächste H5P-Projekt',
    check1: 'H5P-Scan ausführen (01.py für Links & Typen)',
    check2: 'Zentralen h5p-libraries Ordner anlegen',
    check3: 'Universal YouTube Patch anwenden (API Crash-Schutz)',
    check4: 'CSS-Regeln integrieren (calc(100% - 48px), z-index: 50)',
    check5: 'State & Reset (saveFreq: 1 mit automatischer Wiederherstellung)',
    closeHandbook: 'Schließen',
    footerCopyright: '© About the World (about-the-world.org) – Alle Rechte vorbehalten.',
    footerImprint: 'Impressum',
    footerPrivacy: 'Datenschutz',
    footerCookieSettings: 'Cookie-Einstellungen',
    pdfHandbookBadge: 'PDF-Handbuch integriert',
    loading: 'Wird geladen...',
    noResults: 'Keine Inhalte gefunden.',
    subChaptersTitle: 'Unterthemen & Kapitel',
    relatedExercises: 'Interaktive Übungen zum Thema',
    backToOverview: 'Zurück zur Startseite',
    exerciseHeading: 'Interaktive Übung & Wissensprüfung',
    scoreLabel: 'Ergebnis:',
    scorePoints: 'Punkte',
    scoreCompleted: 'Abgeschlossen',

    loginBtn: 'Anmelden',
    logoutBtn: 'Abmelden',
    roleTeacher: 'Lehrperson',
    roleStudent: 'Schüler-Konto',
    roleAdmin: 'Administrator',
    menuDashboard: 'Mein Dashboard & Klassen',
    menuProgress: 'Mein Fortschritt & Aufgaben',
    menuAdmin: 'Admin-Bereich',
    menuTopics: 'Zu den Themen & Fächern',
    loginModalTitle: 'Anmeldung',
    loginRolePrompt: 'Bitte wählen Sie Ihre Rolle:',
    loginRoleTeacherBtn: 'Ich bin Lehrperson',
    loginRoleStudentBtn: 'Ich bin Schüler:in',
    teacherLoginTitle: 'Lehrperson – Anmelden',
    teacherRegisterTitle: 'Lehrperson – Registrieren',
    studentLoginTitle: 'Schüler:in – Anmelden',
    studentLoginSubtitle: 'Gib deinen 5-stelligen Code ein (Großbuchstaben und Ziffern).',
    emailOrUsername: 'E-Mail-Adresse / Benutzername',
    email: 'E-Mail-Adresse',
    password: 'Passwort',
    minCharsHint: '(mind. 6 Zeichen)',
    studentCode: 'Dein Code',
    studentCodePlaceholder: 'z. B. A3X9K',
    btnBack: '← Zurück',
    btnLoginSubmit: 'Anmelden',
    btnLoginLoading: 'Anmelden …',
    btnRegisterSubmit: 'Konto erstellen',
    btnRegisterLoading: 'Registrieren …',
    noAccountPrompt: 'Noch kein Konto?',
    registerNowLink: 'Jetzt registrieren',
    alreadyHaveAccountPrompt: 'Bereits registriert?',
    loginNowLink: 'Hier anmelden',
    loginErrorDefault: 'Login fehlgeschlagen.',
    loginNetworkError: 'Netzwerkfehler. Bitte erneut versuchen.',

    teacherBadge: 'Lehrperson',
    assignedTo: 'Zugewiesen an:',
    notAssignedYet: 'Diese Übung ist noch keiner Klasse zugewiesen.',
    btnAssignToStudents: 'Lernenden zuweisen',
    assignModalTitle: 'Übung Lernenden zuweisen',
    noClassesYet: 'Du hast aktuell noch keine Klassen angelegt.',
    goToDashboardLink: 'Zum Dashboard & Accounts anlegen',
    selectClassesPrompt: 'Wähle eine oder mehrere Klassen aus:',
    selectAll: 'Alle',
    selectNone: 'Keine',
    classItemLabel: 'Klasse',
    studentsCountLabel: 'Schüler',
    btnSaveAssignment: 'Zuordnung speichern',
    btnSaving: 'Wird gespeichert...',
    assignmentSavedSuccess: 'Erfolgreich zugewiesen an:',
    assignmentClearedSuccess: 'Zuweisung für alle Klassen aufgehoben.',

    btnConfirm: 'Bestätigen',
    btnDeleting: 'Wird gelöscht...',

    myProgressTitle: 'Mein Lernfortschritt',
    studentCodeLabel: 'Angemeldet als Schüler-Code:',
    classLabel: 'Klasse',
    assignedTasksForClass: 'Aufgaben für deine Klasse',
    completedOfTotalTasks: 'von {total} erledigt ({percent} %)',
    noAssignedTasksYet: 'Deine Lehrperson hat für deine Klasse aktuell noch keine speziellen Übungen zugewiesen.',
    exerciseNumber: '#',
    alreadyCompleted: 'Erledigt:',
    openTask: 'Noch offen',
    practiceAgain: 'Nochmal üben',
    startExercise: 'Übung starten',
    allPracticedExercises: 'Alle bearbeiteten Übungen',
    noPracticedExercisesYet: 'Du hast noch keine Übungen selbstständig bearbeitet.',
    lastWorkedOn: 'Zuletzt bearbeitet:',
    btnOpen: 'Öffnen',
    allTopicsLink: 'Zu allen Themen und Fächern',
    progressLoading: 'Dein Fortschritt wird geladen...',

    teacherDashboardTitle: 'Lehrpersonen-Dashboard',
    loggedInAs: 'Angemeldet als:',
    btnChangePassword: 'Passwort ändern',
    totalStudentsCard: 'Schüler-Accounts gesamt',
    totalClassesCard: 'Klassen angelegt',
    totalSolvedTasksCard: 'Gelöste Übungen',
    createStudentsTitle: 'Neue Schüler-Accounts generieren',
    classNameLabel: 'Klassenbezeichnung (z. B. 4A, 3B, Geographie-Wahlfach)',
    classNamePlaceholder: 'z. B. 4A',
    countCodesLabel: 'Anzahl Codes',
    btnCreateAccounts: 'Accounts anlegen',
    btnCreating: 'Generiere...',
    accountsCreatedSuccess: '{count} Schüler-Accounts für Klasse "{className}" angelegt.',
    classManagementTitle: 'Klassenverwaltung & Aufgaben-Zuweisung',
    studentsCount: 'Schüler-Accounts',
    assignedTasksCount: 'Zugewiesene Übungen:',
    btnAssignTasksForClass: 'Aufgaben für {className} zuweisen',
    btnRenameClass: 'Klasse umbenennen',
    btnDeleteClass: 'Klasse löschen',
    studentsAndResultsTitle: 'Schüler-Accounts & Ergebnisse',
    allClassesOption: 'Alle Klassen',
    btnCopyCodes: 'Codes kopieren',
    btnDownloadCSV: 'CSV-Export',
    copiedNotice: 'Kopiert!',
    thNumber: '#',
    thStudentCode: 'Schüler-Code',
    thClass: 'Klasse',
    thSolvedTasks: 'Erledigte Übungen',
    thLastActive: 'Zuletzt aktiv',
    thActions: 'Aktionen',
    noStudentsInFilter: 'Keine Schüler-Accounts in dieser Auswahl.',
    noExercisesSolvedYet: 'Noch keine Übung',
    passwordModalTitle: 'Passwort ändern',
    currentPasswordLabel: 'Aktuelles Passwort',
    newPasswordLabel: 'Neues Passwort (mind. 6 Zeichen)',
    confirmNewPasswordLabel: 'Neues Passwort bestätigen',
    passwordMismatchError: 'Die neuen Passwörter stimmen nicht überein.',
    passwordChangedSuccess: 'Passwort erfolgreich geändert.',
    deleteStudentTitle: 'Schüleraccount löschen',
    deleteStudentConfirm: 'Möchtest du den Account mit Code {code} (Klasse {className}) wirklich löschen? Sämtlicher Lernfortschritt wird unwiderruflich entfernt.',
    deleteClassTitle: 'Klasse "{className}" löschen',
    deleteClassConfirm: 'Möchtest du die gesamte Klasse "{className}" mit allen {count} Schüleraccounts und deren Fortschrittsdaten wirklich löschen?',
    renameClassTitle: 'Klasse umbenennen',
    newClassNameLabel: 'Neuer Klassenname',
    btnRenameSubmit: 'Umbenennen',
    searchExercisePlaceholder: 'Übung suchen...',
    selectedCountLabel: '{count} Übungen ausgewählt',

    adminDashboardTitle: 'Administrator-Bereich',
    adminDashboardDesc: 'Zentrale Verwaltung aller registrierten Lehrpersonen, Schüler-Accounts und Lernergebnisse.',
    adminRegisteredTeachers: 'Lehrpersonen registriert',
    adminTotalStudents: 'Schüler-Accounts gesamt',
    adminTotalTasks: 'Erledigte Aufgaben gesamt',
    adminRegisteredDate: 'Registriert:',
    adminResetPasswordBtn: 'Passwort reset',
    adminDeleteTeacherBtn: 'Löschen',
    adminDeleteTeacherTitle: 'Lehrperson löschen?',
    adminDeleteTeacherConfirm: 'Möchtest du die Lehrperson „{email}“ und alle zugehörigen {count} Schüleraccounts sowie alle Fortschrittsdaten wirklich unwiderruflich löschen?',
    adminNewPasswordPlaceholder: 'Neues Passwort (mind. 6 Zeichen)',
    adminSetNewPasswordBtn: 'Neues Passwort setzen',
    adminPasswordResetSuccess: 'Passwort wurde erfolgreich zurückgesetzt.',
    adminTeacherDeletedSuccess: 'Lehrperson „{email}“ wurde gelöscht.',
    adminNoTeachersYet: 'Noch keine Lehrpersonen registriert.',

    whatsNewTitle: 'Neu',
    featureLayout: 'Neues Layout',
    featureSpeed: 'Schnellere Ladezeiten',
    featureStudents: 'Schüler anlegen',
    featureTasks: 'Aufgaben zuordnen & Ergebnisse nachverfolgen',
    featurePrivacy: 'Datenschutzkonform ohne Klarnamen',
  },
  en: {
    platformTitle: 'About the World',
    platformSubtitle: 'Geography, World Countries & Interactive Exercises',
    portalStatus: 'Online',
    docLink: 'H5P Developer Manual & Repair Guide',
    navHome: 'Home',
    navGeography: 'Geography',
    navCountries: 'Countries of the World',
    navMiddleEast: 'The Middle East Conflict',
    navPresidents: 'US Presidents',
    navUsStates: 'US States',
    navContentsToggle: 'Contents',
    welcomeHeading: 'Welcome to about-the-world.org',
    welcomeText: 'Here you will find extensive educational content and interactive exercises around geography, world history, and politics. Learn everything about the countries and cultures of the world!',
    exploreTopicsTitle: 'Subject Areas',
    exploreTopicsSubtitle: 'Select a subject area to explore lessons and corresponding interactive exercises.',
    h5pTitle: 'Interactive Exercise (H5P)',
    btnRestart: 'Restart',
    btnFullscreen: 'Fullscreen',
    btnExitFullscreen: 'Exit Fullscreen',
    stateSavedNotice: 'Previous progress automatically restored',
    resetModalTitle: 'Reset Progress?',
    resetModalDesc: 'Are you sure you want to reset your saved progress for this module and start over?',
    btnCancel: 'Cancel',
    btnConfirmReset: 'Yes, Reset',
    handbookTitle: 'H5P Developer Manual & Repair Guide',
    handbookSubtitle: 'Technical blueprint for H5P packages, video & YouTube fixes, state restoration & CSS',
    checklistTitle: '7. Checklist for your next H5P project',
    check1: 'Run H5P Scan (01.py to identify links & types)',
    check2: 'Setup central h5p-libraries directory pool',
    check3: 'Apply Universal YouTube Patch (prevent API crash)',
    check4: 'Integrate CSS rules (calc(100% - 48px), z-index: 50)',
    check5: 'State & Reset (saveFreq: 1 with automatic restoration)',
    closeHandbook: 'Close',
    footerCopyright: '© About the World (about-the-world.org) – All rights reserved.',
    footerImprint: 'Legal Notice',
    footerPrivacy: 'Privacy Policy',
    footerCookieSettings: 'Cookie Settings',
    pdfHandbookBadge: 'PDF Guide Integrated',
    loading: 'Loading...',
    noResults: 'No content found.',
    subChaptersTitle: 'Sub-topics & Chapters',
    relatedExercises: 'Interactive Exercises on this Topic',
    backToOverview: 'Back to Home',
    exerciseHeading: 'Interactive Exercise & Knowledge Check',
    scoreLabel: 'Score:',
    scorePoints: 'points',
    scoreCompleted: 'Completed',

    loginBtn: 'Log In',
    logoutBtn: 'Log Out',
    roleTeacher: 'Teacher',
    roleStudent: 'Student Account',
    roleAdmin: 'Administrator',
    menuDashboard: 'My Dashboard & Classes',
    menuProgress: 'My Progress & Tasks',
    menuAdmin: 'Admin Area',
    menuTopics: 'To Topics & Subjects',
    loginModalTitle: 'Sign In',
    loginRolePrompt: 'Please select your role:',
    loginRoleTeacherBtn: 'I am a Teacher',
    loginRoleStudentBtn: 'I am a Student',
    teacherLoginTitle: 'Teacher – Log In',
    teacherRegisterTitle: 'Teacher – Register',
    studentLoginTitle: 'Student – Log In',
    studentLoginSubtitle: 'Enter your 5-character code (uppercase letters and digits).',
    emailOrUsername: 'Email address / Username',
    email: 'Email address',
    password: 'Password',
    minCharsHint: '(min. 6 characters)',
    studentCode: 'Your Code',
    studentCodePlaceholder: 'e.g. A3X9K',
    btnBack: '← Back',
    btnLoginSubmit: 'Log In',
    btnLoginLoading: 'Logging in …',
    btnRegisterSubmit: 'Create Account',
    btnRegisterLoading: 'Registering …',
    noAccountPrompt: 'No account yet?',
    registerNowLink: 'Register now',
    alreadyHaveAccountPrompt: 'Already registered?',
    loginNowLink: 'Log in here',
    loginErrorDefault: 'Login failed.',
    loginNetworkError: 'Network error. Please try again.',

    teacherBadge: 'Teacher',
    assignedTo: 'Assigned to:',
    notAssignedYet: 'This exercise is not yet assigned to any class.',
    btnAssignToStudents: 'Assign to Students',
    assignModalTitle: 'Assign Exercise to Students',
    noClassesYet: 'You have not created any classes yet.',
    goToDashboardLink: 'Go to Dashboard & create accounts',
    selectClassesPrompt: 'Select one or more classes:',
    selectAll: 'All',
    selectNone: 'None',
    classItemLabel: 'Class',
    studentsCountLabel: 'students',
    btnSaveAssignment: 'Save Assignment',
    btnSaving: 'Saving...',
    assignmentSavedSuccess: 'Successfully assigned to:',
    assignmentClearedSuccess: 'Assignment cleared for all classes.',

    btnConfirm: 'Confirm',
    btnDeleting: 'Deleting...',

    myProgressTitle: 'My Learning Progress',
    studentCodeLabel: 'Logged in as Student Code:',
    classLabel: 'Class',
    assignedTasksForClass: 'Assigned Tasks for Your Class',
    completedOfTotalTasks: 'of {total} completed ({percent} %)',
    noAssignedTasksYet: 'Your teacher has not assigned any specific exercises to your class yet.',
    exerciseNumber: '#',
    alreadyCompleted: 'Completed:',
    openTask: 'Pending',
    practiceAgain: 'Practice Again',
    startExercise: 'Start Exercise',
    allPracticedExercises: 'All Completed Exercises',
    noPracticedExercisesYet: 'You have not practiced any exercises yet.',
    lastWorkedOn: 'Last worked on:',
    btnOpen: 'Open',
    allTopicsLink: 'To all topics & subjects',
    progressLoading: 'Loading your progress...',

    teacherDashboardTitle: 'Teacher Dashboard',
    loggedInAs: 'Logged in as:',
    btnChangePassword: 'Change Password',
    totalStudentsCard: 'Total Student Accounts',
    totalClassesCard: 'Classes Created',
    totalSolvedTasksCard: 'Completed Exercises',
    createStudentsTitle: 'Generate New Student Accounts',
    classNameLabel: 'Class Name (e.g. 4A, 3B, Geography Elective)',
    classNamePlaceholder: 'e.g. 4A',
    countCodesLabel: 'Number of Codes',
    btnCreateAccounts: 'Create Accounts',
    btnCreating: 'Generating...',
    accountsCreatedSuccess: '{count} student accounts created for class "{className}".',
    classManagementTitle: 'Class Management & Task Assignments',
    studentsCount: 'Student Accounts',
    assignedTasksCount: 'Assigned Exercises:',
    btnAssignTasksForClass: 'Assign tasks for {className}',
    btnRenameClass: 'Rename Class',
    btnDeleteClass: 'Delete Class',
    studentsAndResultsTitle: 'Student Accounts & Results',
    allClassesOption: 'All Classes',
    btnCopyCodes: 'Copy Codes',
    btnDownloadCSV: 'CSV Export',
    copiedNotice: 'Copied!',
    thNumber: '#',
    thStudentCode: 'Student Code',
    thClass: 'Class',
    thSolvedTasks: 'Completed Exercises',
    thLastActive: 'Last Active',
    thActions: 'Actions',
    noStudentsInFilter: 'No student accounts in this selection.',
    noExercisesSolvedYet: 'No exercise yet',
    passwordModalTitle: 'Change Password',
    currentPasswordLabel: 'Current Password',
    newPasswordLabel: 'New Password (min. 6 characters)',
    confirmNewPasswordLabel: 'Confirm New Password',
    passwordMismatchError: 'New passwords do not match.',
    passwordChangedSuccess: 'Password changed successfully.',
    deleteStudentTitle: 'Delete Student Account',
    deleteStudentConfirm: 'Are you sure you want to delete the account with code {code} (Class {className})? All progress will be permanently removed.',
    deleteClassTitle: 'Delete Class "{className}"',
    deleteClassConfirm: 'Are you sure you want to delete the entire class "{className}" with all {count} student accounts and their progress data?',
    renameClassTitle: 'Rename Class',
    newClassNameLabel: 'New Class Name',
    btnRenameSubmit: 'Rename',
    searchExercisePlaceholder: 'Search exercise...',
    selectedCountLabel: '{count} exercises selected',

    adminDashboardTitle: 'Administrator Area',
    adminDashboardDesc: 'Central administration of registered teachers, student accounts, and learning progress.',
    adminRegisteredTeachers: 'Teachers Registered',
    adminTotalStudents: 'Total Student Accounts',
    adminTotalTasks: 'Total Completed Exercises',
    adminRegisteredDate: 'Registered:',
    adminResetPasswordBtn: 'Reset Password',
    adminDeleteTeacherBtn: 'Delete',
    adminDeleteTeacherTitle: 'Delete Teacher?',
    adminDeleteTeacherConfirm: 'Are you sure you want to permanently delete teacher „{email}“ and all {count} associated student accounts along with all progress data?',
    adminNewPasswordPlaceholder: 'New password (min. 6 chars)',
    adminSetNewPasswordBtn: 'Set New Password',
    adminPasswordResetSuccess: 'Password has been reset successfully.',
    adminTeacherDeletedSuccess: 'Teacher „{email}“ has been deleted.',
    adminNoTeachersYet: 'No teachers registered yet.',

    whatsNewTitle: 'New',
    featureLayout: 'New Layout',
    featureSpeed: 'Faster Load Times',
    featureStudents: 'Create Students',
    featureTasks: 'Assign Tasks & Track Results',
    featurePrivacy: 'GDPR-Compliant Without Real Names',
  },
  fr: {
    platformTitle: 'About the World',
    platformSubtitle: 'Géographie, Pays du Monde & Exercices Interactifs',
    portalStatus: 'En ligne',
    docLink: 'Manuel de Réparation H5P',
    navHome: 'Accueil',
    navGeography: 'Géographie',
    navCountries: 'Pays du Monde',
    navMiddleEast: 'Le Conflit au Proche-Orient',
    navPresidents: 'Présidents des États-Unis',
    navUsStates: 'États des États-Unis',
    navContentsToggle: 'Contenus',
    welcomeHeading: 'Bienvenue sur about-the-world.org',
    welcomeText: 'Vous trouverez ici des contenus éducatifs et des exercices interactifs sur la géographie, l\'histoire et la politique mondiale.',
    exploreTopicsTitle: 'Thématiques',
    exploreTopicsSubtitle: 'Choisissez un domaine pour accéder aux leçons et aux exercices interactifs.',
    h5pTitle: 'Exercice Interactif (H5P)',
    btnRestart: 'Recommencer',
    btnFullscreen: 'Plein écran',
    btnExitFullscreen: 'Quitter le plein écran',
    stateSavedNotice: 'État précédent restauré automatiquement',
    resetModalTitle: 'Réinitialiser la progression ?',
    resetModalDesc: 'Voulez-vous vraiment effacer votre progression pour ce module et recommencer ?',
    btnCancel: 'Annuler',
    btnConfirmReset: 'Oui, réinitialiser',
    handbookTitle: 'Manuel Développeur & Guide de Réparation H5P',
    handbookSubtitle: 'Guide technique pour les paquets H5P, correctifs vidéo et YouTube',
    checklistTitle: '7. Liste de contrôle pour le projet H5P',
    check1: 'Exécuter l\'analyse H5P (01.py)',
    check2: 'Créer le dossier central h5p-libraries',
    check3: 'Appliquer le patch universel YouTube',
    check4: 'Intégrer les règles CSS (calc(100% - 48px), z-index: 50)',
    check5: 'État & Réinitialisation (saveFreq: 1)',
    closeHandbook: 'Fermer',
    footerCopyright: '© About the World (about-the-world.org) – Tous droits réservés.',
    footerImprint: 'Mentions Légales',
    footerPrivacy: 'Politique de Confidentialité',
    footerCookieSettings: 'Paramètres des Cookies',
    pdfHandbookBadge: 'Guide PDF Intégré',
    loading: 'Chargement...',
    noResults: 'Aucun contenu trouvé.',
    subChaptersTitle: 'Sous-thèmes & Chapitres',
    relatedExercises: 'Exercices Interactifs Associés',
    backToOverview: 'Retour à l\'accueil',
    exerciseHeading: 'Exercice Interactif & Évaluation',
    scoreLabel: 'Résultat :',
    scorePoints: 'points',
    scoreCompleted: 'Terminé',

    loginBtn: 'Connexion',
    logoutBtn: 'Déconnexion',
    roleTeacher: 'Enseignant',
    roleStudent: 'Compte Élève',
    roleAdmin: 'Administrateur',
    menuDashboard: 'Tableau de bord & Classes',
    menuProgress: 'Mes Progrès & Devoirs',
    menuAdmin: 'Zone Admin',
    menuTopics: 'Accéder aux Sujets',
    loginModalTitle: 'Connexion',
    loginRolePrompt: 'Veuillez sélectionner votre rôle :',
    loginRoleTeacherBtn: 'Je suis Enseignant',
    loginRoleStudentBtn: 'Je suis Élève',
    teacherLoginTitle: 'Enseignant – Connexion',
    teacherRegisterTitle: 'Enseignant – Inscription',
    studentLoginTitle: 'Élève – Connexion',
    studentLoginSubtitle: 'Entrez votre code à 5 caractères (lettres majuscules et chiffres).',
    emailOrUsername: 'Adresse e-mail / Nom d\'utilisateur',
    email: 'Adresse e-mail',
    password: 'Mot de passe',
    minCharsHint: '(min. 6 caractères)',
    studentCode: 'Votre Code',
    studentCodePlaceholder: 'ex. A3X9K',
    btnBack: '← Retour',
    btnLoginSubmit: 'Se connecter',
    btnLoginLoading: 'Connexion en cours …',
    btnRegisterSubmit: 'Créer un compte',
    btnRegisterLoading: 'Inscription en cours …',
    noAccountPrompt: 'Pas encore de compte ?',
    registerNowLink: 'S\'inscrire maintenant',
    alreadyHaveAccountPrompt: 'Déjà inscrit ?',
    loginNowLink: 'Se connecter ici',
    loginErrorDefault: 'Échec de la connexion.',
    loginNetworkError: 'Erreur réseau. Veuillez réessayer.',

    teacherBadge: 'Enseignant',
    assignedTo: 'Attribué à :',
    notAssignedYet: 'Cet exercice n\'est encore attribué à aucune classe.',
    btnAssignToStudents: 'Attribuer aux Élèves',
    assignModalTitle: 'Attribuer l\'exercice aux Élèves',
    noClassesYet: 'Vous n\'avez pas encore créé de classe.',
    goToDashboardLink: 'Aller au Tableau de bord & créer des comptes',
    selectClassesPrompt: 'Sélectionnez une ou plusieurs classes :',
    selectAll: 'Tout',
    selectNone: 'Aucun',
    classItemLabel: 'Classe',
    studentsCountLabel: 'élèves',
    btnSaveAssignment: 'Enregistrer l\'attribution',
    btnSaving: 'Enregistrement...',
    assignmentSavedSuccess: 'Attribué avec succès à :',
    assignmentClearedSuccess: 'Attribution supprimée pour toutes les classes.',

    btnConfirm: 'Confirmer',
    btnDeleting: 'Suppression en cours...',

    myProgressTitle: 'Mes Progrès d\'Apprentissage',
    studentCodeLabel: 'Connecté avec le Code Élève :',
    classLabel: 'Classe',
    assignedTasksForClass: 'Exercices attribués à votre classe',
    completedOfTotalTasks: 'sur {total} terminés ({percent} %)',
    noAssignedTasksYet: 'Votre enseignant n\'a pas encore attribué d\'exercices spécifiques à votre classe.',
    exerciseNumber: '#',
    alreadyCompleted: 'Terminé :',
    openTask: 'En attente',
    practiceAgain: 'Recommencer',
    startExercise: 'Commencer l\'exercice',
    allPracticedExercises: 'Tous les exercices terminés',
    noPracticedExercisesYet: 'Vous n\'avez pas encore effectué d\'exercices.',
    lastWorkedOn: 'Dernière activité :',
    btnOpen: 'Ouvrir',
    allTopicsLink: 'Vers toutes les thématiques',
    progressLoading: 'Chargement de votre progression...',

    teacherDashboardTitle: 'Tableau de bord Enseignant',
    loggedInAs: 'Connecté en tant que :',
    btnChangePassword: 'Changer le mot de passe',
    totalStudentsCard: 'Total des comptes élèves',
    totalClassesCard: 'Classes créées',
    totalSolvedTasksCard: 'Exercices terminés',
    createStudentsTitle: 'Générer de nouveaux comptes élèves',
    classNameLabel: 'Nom de la classe (ex. 4A, 3B)',
    classNamePlaceholder: 'ex. 4A',
    countCodesLabel: 'Nombre de codes',
    btnCreateAccounts: 'Créer les comptes',
    btnCreating: 'Génération...',
    accountsCreatedSuccess: '{count} comptes élèves créés pour la classe "{className}".',
    classManagementTitle: 'Gestion des classes & Attribution des devoirs',
    studentsCount: 'Comptes Élèves',
    assignedTasksCount: 'Exercices attribués :',
    btnAssignTasksForClass: 'Attribuer des devoirs pour {className}',
    btnRenameClass: 'Renommer la classe',
    btnDeleteClass: 'Supprimer la classe',
    studentsAndResultsTitle: 'Comptes Élèves & Résultats',
    allClassesOption: 'Toutes les classes',
    btnCopyCodes: 'Copier les codes',
    btnDownloadCSV: 'Export CSV',
    copiedNotice: 'Copié !',
    thNumber: '#',
    thStudentCode: 'Code Élève',
    thClass: 'Classe',
    thSolvedTasks: 'Exercices terminés',
    thLastActive: 'Dernière activité',
    thActions: 'Actions',
    noStudentsInFilter: 'Aucun compte élève dans cette sélection.',
    noExercisesSolvedYet: 'Aucun exercice pour le moment',
    passwordModalTitle: 'Changer le mot de passe',
    currentPasswordLabel: 'Mot de passe actuel',
    newPasswordLabel: 'Nouveau mot de passe (min. 6 caractères)',
    confirmNewPasswordLabel: 'Confirmer le nouveau mot de passe',
    passwordMismatchError: 'Les mots de passe ne correspondent pas.',
    passwordChangedSuccess: 'Mot de passe modifié avec succès.',
    deleteStudentTitle: 'Supprimer le compte élève',
    deleteStudentConfirm: 'Voulez-vous vraiment supprimer le compte avec le code {code} (Classe {className}) ? Tous les progrès seront définitivement perdus.',
    deleteClassTitle: 'Supprimer la classe "{className}"',
    deleteClassConfirm: 'Voulez-vous vraiment supprimer toute la classe "{className}" avec ses {count} comptes élèves et leurs progrès ?',
    renameClassTitle: 'Renommer la classe',
    newClassNameLabel: 'Nouveau nom de classe',
    btnRenameSubmit: 'Renommer',
    searchExercisePlaceholder: 'Rechercher un exercice...',
    selectedCountLabel: '{count} exercices sélectionnés',

    adminDashboardTitle: 'Espace Administrateur',
    adminDashboardDesc: 'Gestion globale des enseignants, des comptes élèves et des résultats d\'apprentissage.',
    adminRegisteredTeachers: 'Enseignants inscrits',
    adminTotalStudents: 'Total des comptes élèves',
    adminTotalTasks: 'Total des exercices terminés',
    adminRegisteredDate: 'Inscrit le :',
    adminResetPasswordBtn: 'Réinitialiser mot de passe',
    adminDeleteTeacherBtn: 'Supprimer',
    adminDeleteTeacherTitle: 'Supprimer l\'enseignant ?',
    adminDeleteTeacherConfirm: 'Voulez-vous vraiment supprimer définitivement l\'enseignant « {email} » et ses {count} comptes élèves associés ainsi que toutes les données de progression ?',
    adminNewPasswordPlaceholder: 'Nouveau mot de passe (min. 6 car.)',
    adminSetNewPasswordBtn: 'Définir le mot de passe',
    adminPasswordResetSuccess: 'Le mot de passe a été réinitialisé avec succès.',
    adminTeacherDeletedSuccess: 'L\'enseignant « {email} » a été supprimé.',
    adminNoTeachersYet: 'Aucun enseignant inscrit pour le moment.',

    whatsNewTitle: 'Nouveau',
    featureLayout: 'Nouvelle mise en page',
    featureSpeed: 'Temps de chargement plus rapides',
    featureStudents: 'Créer des élèves',
    featureTasks: 'Assigner des tâches & suivre les résultats',
    featurePrivacy: 'Conforme RGPD sans vrais noms',
  },
  es: {
    platformTitle: 'About the World',
    platformSubtitle: 'Geografía, Países del Mundo y Ejercicios Interactivos',
    portalStatus: 'En línea',
    docLink: 'Manual de Reparación H5P',
    navHome: 'Inicio',
    navGeography: 'Geografía',
    navCountries: 'Países del Mundo',
    navMiddleEast: 'El Conflicto de Oriente Próximo',
    navPresidents: 'Presidentes de EE.UU.',
    navUsStates: 'Estados de EE.UU.',
    navContentsToggle: 'Contenidos',
    welcomeHeading: 'Bienvenido a about-the-world.org',
    welcomeText: 'Aquí encontrarás contenidos educativos y ejercicios interactivos sobre geografía, historia mundial y política.',
    exploreTopicsTitle: 'Áreas Temáticas',
    exploreTopicsSubtitle: 'Selecciona un área temática para explorar lecciones y ejercicios interactivos.',
    h5pTitle: 'Ejercicio Interactivo (H5P)',
    btnRestart: 'Reiniciar',
    btnFullscreen: 'Pantalla completa',
    btnExitFullscreen: 'Salir de pantalla completa',
    stateSavedNotice: 'Progreso anterior restaurado automáticamente',
    resetModalTitle: '¿Restablecer progreso?',
    resetModalDesc: '¿Seguro que deseas restablecer tu progreso guardado para este módulo y empezar de nuevo?',
    btnCancel: 'Cancelar',
    btnConfirmReset: 'Sí, restablecer',
    handbookTitle: 'Manual de Desarrollador y Guía de Reparación H5P',
    handbookSubtitle: 'Guía técnica para paquetes H5P, correcciones de vídeo y YouTube',
    checklistTitle: '7. Lista de verificación para el proyecto H5P',
    check1: 'Ejecutar escaneo H5P (01.py)',
    check2: 'Crear carpeta central h5p-libraries',
    check3: 'Aplicar parche universal de YouTube',
    check4: 'Integrar reglas CSS (calc(100% - 48px), z-index: 50)',
    check5: 'Estado y reinicio (saveFreq: 1)',
    closeHandbook: 'Cerrar',
    footerCopyright: '© About the World (about-the-world.org) – Todos los derechos reservados.',
    footerImprint: 'Aviso Legal',
    footerPrivacy: 'Política de Privacidad',
    footerCookieSettings: 'Configuración de Cookies',
    pdfHandbookBadge: 'Guía PDF Integrada',
    loading: 'Cargando...',
    noResults: 'No se encontraron contenidos.',
    subChaptersTitle: 'Subtemas y Capítulos',
    relatedExercises: 'Ejercicios Interactivos Asociados',
    backToOverview: 'Volver al inicio',
    exerciseHeading: 'Ejercicio Interactivo y Evaluación',
    scoreLabel: 'Puntuación:',
    scorePoints: 'puntos',
    scoreCompleted: 'Completado',

    loginBtn: 'Iniciar sesión',
    logoutBtn: 'Cerrar sesión',
    roleTeacher: 'Profesor',
    roleStudent: 'Cuenta de Alumno',
    roleAdmin: 'Administrador',
    menuDashboard: 'Mi Panel y Clases',
    menuProgress: 'Mi Progreso y Tareas',
    menuAdmin: 'Área de Admin',
    menuTopics: 'Ir a los Temas',
    loginModalTitle: 'Iniciar Sesión',
    loginRolePrompt: 'Por favor, selecciona tu rol:',
    loginRoleTeacherBtn: 'Soy Profesor',
    loginRoleStudentBtn: 'Soy Alumno',
    teacherLoginTitle: 'Profesor – Iniciar Sesión',
    teacherRegisterTitle: 'Profesor – Registrarse',
    studentLoginTitle: 'Alumno – Iniciar Sesión',
    studentLoginSubtitle: 'Introduce tu código de 5 caracteres (letras mayúsculas y dígitos).',
    emailOrUsername: 'Correo electrónico / Usuario',
    email: 'Correo electrónico',
    password: 'Contraseña',
    minCharsHint: '(mín. 6 caracteres)',
    studentCode: 'Tu Código',
    studentCodePlaceholder: 'ej. A3X9K',
    btnBack: '← Volver',
    btnLoginSubmit: 'Iniciar Sesión',
    btnLoginLoading: 'Iniciando sesión …',
    btnRegisterSubmit: 'Crear Cuenta',
    btnRegisterLoading: 'Registrando …',
    noAccountPrompt: '¿No tienes cuenta?',
    registerNowLink: 'Regístrate ahora',
    alreadyHaveAccountPrompt: '¿Ya estás registrado?',
    loginNowLink: 'Inicia sesión aquí',
    loginErrorDefault: 'Error al iniciar sesión.',
    loginNetworkError: 'Error de red. Por favor, inténtalo de nuevo.',

    teacherBadge: 'Profesor',
    assignedTo: 'Asignado a:',
    notAssignedYet: 'Este ejercicio aún no está asignado a ninguna clase.',
    btnAssignToStudents: 'Asignar a Alumnos',
    assignModalTitle: 'Asignar Ejercicio a Alumnos',
    noClassesYet: 'Aún no has creado ninguna clase.',
    goToDashboardLink: 'Ir al Panel y crear cuentas',
    selectClassesPrompt: 'Selecciona una o más clases:',
    selectAll: 'Todas',
    selectNone: 'Ninguna',
    classItemLabel: 'Clase',
    studentsCountLabel: 'alumnos',
    btnSaveAssignment: 'Guardar Asignación',
    btnSaving: 'Guardando...',
    assignmentSavedSuccess: 'Asignado con éxito a:',
    assignmentClearedSuccess: 'Asignación eliminada para todas las clases.',

    btnConfirm: 'Confirmar',
    btnDeleting: 'Eliminando...',

    myProgressTitle: 'Mi Progreso de Aprendizaje',
    studentCodeLabel: 'Conectado como Código de Alumno:',
    classLabel: 'Clase',
    assignedTasksForClass: 'Tareas asignadas para tu clase',
    completedOfTotalTasks: 'de {total} completadas ({percent} %)',
    noAssignedTasksYet: 'Tu profesor aún no ha asignado ejercicios específicos a tu clase.',
    exerciseNumber: '#',
    alreadyCompleted: 'Completado:',
    openTask: 'Pendiente',
    practiceAgain: 'Practicar de nuevo',
    startExercise: 'Iniciar Ejercicio',
    allPracticedExercises: 'Todos los ejercicios realizados',
    noPracticedExercisesYet: 'Aún no has practicado ningún ejercicio.',
    lastWorkedOn: 'Última actividad:',
    btnOpen: 'Abrir',
    allTopicsLink: 'A todos los temas y materias',
    progressLoading: 'Cargando tu progreso...',

    teacherDashboardTitle: 'Panel del Profesor',
    loggedInAs: 'Conectado como:',
    btnChangePassword: 'Cambiar Contraseña',
    totalStudentsCard: 'Total de cuentas de alumnos',
    totalClassesCard: 'Clases creadas',
    totalSolvedTasksCard: 'Ejercicios completados',
    createStudentsTitle: 'Generar nuevas cuentas de alumnos',
    classNameLabel: 'Nombre de la clase (ej. 4A, 3B)',
    classNamePlaceholder: 'ej. 4A',
    countCodesLabel: 'Cantidad de códigos',
    btnCreateAccounts: 'Crear Cuentas',
    btnCreating: 'Generando...',
    accountsCreatedSuccess: '{count} cuentas de alumnos creadas para la clase "{className}".',
    classManagementTitle: 'Gestión de Clases y Asignación de Tareas',
    studentsCount: 'Cuentas de Alumnos',
    assignedTasksCount: 'Ejercicios asignados:',
    btnAssignTasksForClass: 'Asignar tareas para {className}',
    btnRenameClass: 'Renombrar Clase',
    btnDeleteClass: 'Eliminar Clase',
    studentsAndResultsTitle: 'Cuentas de Alumnos y Resultados',
    allClassesOption: 'Todas las clases',
    btnCopyCodes: 'Copiar Códigos',
    btnDownloadCSV: 'Exportar CSV',
    copiedNotice: '¡Copiado!',
    thNumber: '#',
    thStudentCode: 'Código de Alumno',
    thClass: 'Clase',
    thSolvedTasks: 'Ejercicios realizados',
    thLastActive: 'Última actividad',
    thActions: 'Acciones',
    noStudentsInFilter: 'No hay cuentas de alumnos en esta selección.',
    noExercisesSolvedYet: 'Ningún ejercicio aún',
    passwordModalTitle: 'Cambiar Contraseña',
    currentPasswordLabel: 'Contraseña actual',
    newPasswordLabel: 'Nueva contraseña (mín. 6 caracteres)',
    confirmNewPasswordLabel: 'Confirmar nueva contraseña',
    passwordMismatchError: 'Las nuevas contraseñas no coinciden.',
    passwordChangedSuccess: 'Contraseña cambiada con éxito.',
    deleteStudentTitle: 'Eliminar Cuenta de Alumno',
    deleteStudentConfirm: '¿Seguro que deseas eliminar la cuenta con código {code} (Clase {className})? Todo el progreso se borrará de forma permanente.',
    deleteClassTitle: 'Eliminar Clase "{className}"',
    deleteClassConfirm: '¿Seguro que deseas eliminar toda la clase "{className}" con todas sus {count} cuentas de alumnos y sus datos de progreso?',
    renameClassTitle: 'Renombrar Clase',
    newClassNameLabel: 'Nuevo nombre de clase',
    btnRenameSubmit: 'Renombrar',
    searchExercisePlaceholder: 'Buscar ejercicio...',
    selectedCountLabel: '{count} ejercicios seleccionados',

    adminDashboardTitle: 'Área de Administración',
    adminDashboardDesc: 'Gestión centralizada de profesores registrados, cuentas de alumnos y progreso de aprendizaje.',
    adminRegisteredTeachers: 'Profesores registrados',
    adminTotalStudents: 'Total de cuentas de alumnos',
    adminTotalTasks: 'Total de ejercicios completados',
    adminRegisteredDate: 'Registrado:',
    adminResetPasswordBtn: 'Restablecer contraseña',
    adminDeleteTeacherBtn: 'Eliminar',
    adminDeleteTeacherTitle: '¿Eliminar profesor?',
    adminDeleteTeacherConfirm: '¿Seguro que deseas eliminar de forma permanente al profesor «{email}» y todas sus {count} cuentas de alumnos asociadas junto con sus datos de progreso?',
    adminNewPasswordPlaceholder: 'Nueva contraseña (mín. 6 car.)',
    adminSetNewPasswordBtn: 'Establecer Contraseña',
    adminPasswordResetSuccess: 'La contraseña se ha restablecido con éxito.',
    adminTeacherDeletedSuccess: 'El profesor «{email}» ha sido eliminado.',
    adminNoTeachersYet: 'Aún no hay profesores registrados.',

    whatsNewTitle: 'Nuevo',
    featureLayout: 'Nuevo diseño',
    featureSpeed: 'Cargas más rápidas',
    featureStudents: 'Crear alumnos',
    featureTasks: 'Asignar tareas y seguir resultados',
    featurePrivacy: 'Conforme a RGPD sin nombres reales',
  },
  it: {
    platformTitle: 'About the World',
    platformSubtitle: 'Geografia, Paesi del Mondo ed Esercizi Interattivi',
    portalStatus: 'Online',
    docLink: 'Manuale di Riparazione H5P',
    navHome: 'Home',
    navGeography: 'Geografia',
    navCountries: 'Paesi del Mondo',
    navMiddleEast: 'Il Conflitto in Medio Oriente',
    navPresidents: 'Presidenti degli Stati Uniti',
    navUsStates: 'Stati degli Stati Uniti',
    navContentsToggle: 'Contenuti',
    welcomeHeading: 'Benvenuti su about-the-world.org',
    welcomeText: 'Qui troverai contenuti didattici ed esercizi interattivi su geografia, storia del mondo e politica.',
    exploreTopicsTitle: 'Aree Tematiche',
    exploreTopicsSubtitle: 'Scegli un\'area tematica per accedere alle lezioni e agli esercizi interattivi.',
    h5pTitle: 'Esercizio Interattivo (H5P)',
    btnRestart: 'Riavvia',
    btnFullscreen: 'Schermo intero',
    btnExitFullscreen: 'Esci da schermo intero',
    stateSavedNotice: 'Stato precedente ripristinato automaticamente',
    resetModalTitle: 'Ripristinare i progressi?',
    resetModalDesc: 'Vuoi davvero cancellare i tuoi progressi per questo modulo e ricominciare da capo?',
    btnCancel: 'Annulla',
    btnConfirmReset: 'Sì, ripristina',
    handbookTitle: 'Manuale Sviluppatore & Guida alla Riparazione H5P',
    handbookSubtitle: 'Guida tecnica per pacchetti H5P, correzioni video e YouTube',
    checklistTitle: '7. Lista di controllo per il proyecto H5P',
    check1: 'Eseguire la scansione H5P (01.py)',
    check2: 'Creare la cartella centrale h5p-libraries',
    check3: 'Applicare la patch universale per YouTube',
    check4: 'Integrare le regole CSS (calc(100% - 48px), z-index: 50)',
    check5: 'Stato e ripristino (saveFreq: 1)',
    closeHandbook: 'Chiudi',
    footerCopyright: '© About the World (about-the-world.org) – Tutti i diritti riservati.',
    footerImprint: 'Note Legali',
    footerPrivacy: 'Informativa sulla Privacy',
    footerCookieSettings: 'Impostazioni dei Cookie',
    pdfHandbookBadge: 'Guida PDF Integrata',
    loading: 'Caricamento...',
    noResults: 'Nessun contenuto trovato.',
    subChaptersTitle: 'Sotto-temi & Capitoli',
    relatedExercises: 'Esercizi Interattivi Correlati',
    backToOverview: 'Torna alla Home',
    exerciseHeading: 'Esercizio Interattivo & Verifica',
    scoreLabel: 'Risultato:',
    scorePoints: 'punti',
    scoreCompleted: 'Completato',

    loginBtn: 'Accedi',
    logoutBtn: 'Esci',
    roleTeacher: 'Insegnante',
    roleStudent: 'Account Studente',
    roleAdmin: 'Amministratore',
    menuDashboard: 'Dashboard & Classi',
    menuProgress: 'I Miei Progressi & Compiti',
    menuAdmin: 'Area Admin',
    menuTopics: 'Vai agli Argomenti',
    loginModalTitle: 'Accesso',
    loginRolePrompt: 'Seleziona il tuo ruolo:',
    loginRoleTeacherBtn: 'Sono un Insegnante',
    loginRoleStudentBtn: 'Sono uno Studente',
    teacherLoginTitle: 'Insegnante – Accesso',
    teacherRegisterTitle: 'Insegnante – Registrazione',
    studentLoginTitle: 'Studente – Accesso',
    studentLoginSubtitle: 'Inserisci il tuo codice a 5 caratteri (lettere maiuscole e cifre).',
    emailOrUsername: 'Indirizzo e-mail / Nome utente',
    email: 'Indirizzo e-mail',
    password: 'Password',
    minCharsHint: '(min. 6 caratteri)',
    studentCode: 'Il Tuo Codice',
    studentCodePlaceholder: 'es. A3X9K',
    btnBack: '← Indietro',
    btnLoginSubmit: 'Accedi',
    btnLoginLoading: 'Accesso in corso …',
    btnRegisterSubmit: 'Crea Account',
    btnRegisterLoading: 'Registrazione in corso …',
    noAccountPrompt: 'Non hai ancora un account?',
    registerNowLink: 'Registrati ora',
    alreadyHaveAccountPrompt: 'Sei già registrato?',
    loginNowLink: 'Accedi qui',
    loginErrorDefault: 'Accesso non riuscito.',
    loginNetworkError: 'Errore di rete. Riprova.',

    teacherBadge: 'Insegnante',
    assignedTo: 'Assegnato a:',
    notAssignedYet: 'Questo esercizio non è ancora assegnato ad alcuna classe.',
    btnAssignToStudents: 'Assegna agli Studenti',
    assignModalTitle: 'Assegna Esercizio agli Studenti',
    noClassesYet: 'Non hai ancora creato nessuna classe.',
    goToDashboardLink: 'Vai alla Dashboard & crea account',
    selectClassesPrompt: 'Seleziona una o più classi:',
    selectAll: 'Tutte',
    selectNone: 'Nessuna',
    classItemLabel: 'Classe',
    studentsCountLabel: 'studenti',
    btnSaveAssignment: 'Salva Assegnazione',
    btnSaving: 'Salvataggio...',
    assignmentSavedSuccess: 'Assegnato con successo a:',
    assignmentClearedSuccess: 'Assegnazione rimossa per tutte le classi.',

    btnConfirm: 'Conferma',
    btnDeleting: 'Eliminazione in corso...',

    myProgressTitle: 'I Miei Progressi di Apprendimento',
    studentCodeLabel: 'Connesso come Codice Studente:',
    classLabel: 'Classe',
    assignedTasksForClass: 'Compiti assegnati per la tua classe',
    completedOfTotalTasks: 'su {total} completati ({percent} %)',
    noAssignedTasksYet: 'Il tuo insegnante non ha ancora assegnato esercizi specifici alla tua classe.',
    exerciseNumber: '#',
    alreadyCompleted: 'Completato:',
    openTask: 'In sospeso',
    practiceAgain: 'Esercitati di nuovo',
    startExercise: 'Inizia Esercizio',
    allPracticedExercises: 'Tutti gli esercizi svolti',
    noPracticedExercisesYet: 'Non hai ancora svolto nessun esercizio.',
    lastWorkedOn: 'Ultima attività:',
    btnOpen: 'Apri',
    allTopicsLink: 'A tutti gli argomenti e materie',
    progressLoading: 'Caricamento dei tuoi progressi...',

    teacherDashboardTitle: 'Dashboard Insegnante',
    loggedInAs: 'Connesso come:',
    btnChangePassword: 'Cambia Password',
    totalStudentsCard: 'Totale account studenti',
    totalClassesCard: 'Classi create',
    totalSolvedTasksCard: 'Esercizi completati',
    createStudentsTitle: 'Genera nuovi account studenti',
    classNameLabel: 'Nome della classe (es. 4A, 3B)',
    classNamePlaceholder: 'es. 4A',
    countCodesLabel: 'Numero di codici',
    btnCreateAccounts: 'Crea Account',
    btnCreating: 'Generazione...',
    accountsCreatedSuccess: '{count} account studenti creati per la classe "{className}".',
    classManagementTitle: 'Gestione Classi & Assegnazione Compiti',
    studentsCount: 'Account Studenti',
    assignedTasksCount: 'Esercizi assegnati:',
    btnAssignTasksForClass: 'Assegna compiti per {className}',
    btnRenameClass: 'Rinomina Classe',
    btnDeleteClass: 'Elimina Classe',
    studentsAndResultsTitle: 'Account Studenti & Risultati',
    allClassesOption: 'Tutte le classi',
    btnCopyCodes: 'Copia Codici',
    btnDownloadCSV: 'Esporta CSV',
    copiedNotice: 'Copiato!',
    thNumber: '#',
    thStudentCode: 'Codice Studente',
    thClass: 'Classe',
    thSolvedTasks: 'Esercizi svolti',
    thLastActive: 'Ultima attività',
    thActions: 'Azioni',
    noStudentsInFilter: 'Nessun account studente in questa selezione.',
    noExercisesSolvedYet: 'Nessun esercizio ancora',
    passwordModalTitle: 'Cambia Password',
    currentPasswordLabel: 'Password attuale',
    newPasswordLabel: 'Nuova password (min. 6 caratteri)',
    confirmNewPasswordLabel: 'Conferma nuova password',
    passwordMismatchError: 'Le nuove password non corrispondono.',
    passwordChangedSuccess: 'Password modificata con successo.',
    deleteStudentTitle: 'Elimina Account Studente',
    deleteStudentConfirm: 'Vuoi davvero eliminare l\'account con codice {code} (Classe {className})? Tutti i progressi verranno rimossi definitivamente.',
    deleteClassTitle: 'Elimina Classe "{className}"',
    deleteClassConfirm: 'Vuoi davvero eliminare l\'intera classe "{className}" con tutti i suoi {count} account studenti e i relativi progressi?',
    renameClassTitle: 'Rinomina Classe',
    newClassNameLabel: 'Nuovo nome classe',
    btnRenameSubmit: 'Rinomina',
    searchExercisePlaceholder: 'Cerca esercizio...',
    selectedCountLabel: '{count} esercizi selezionati',

    adminDashboardTitle: 'Area Amministratore',
    adminDashboardDesc: 'Gestione centrale degli insegnanti registrati, degli account studenti e dei progressi di apprendimento.',
    adminRegisteredTeachers: 'Insegnanti registrati',
    adminTotalStudents: 'Totale account studenti',
    adminTotalTasks: 'Totale esercizi completati',
    adminRegisteredDate: 'Registrato il:',
    adminResetPasswordBtn: 'Reimposta password',
    adminDeleteTeacherBtn: 'Elimina',
    adminDeleteTeacherTitle: 'Eliminare l\'insegnante?',
    adminDeleteTeacherConfirm: 'Vuoi davvero eliminare definitivamente l\'insegnante «{email}» e tutti i {count} account studenti associati insieme a tutti i dati di progresso?',
    adminNewPasswordPlaceholder: 'Nuova password (min. 6 car.)',
    adminSetNewPasswordBtn: 'Imposta Password',
    adminPasswordResetSuccess: 'La password è stata reimpostata con successo.',
    adminTeacherDeletedSuccess: 'L\'insegnante «{email}» è stato eliminato.',
    adminNoTeachersYet: 'Nessun insegnante registrato al momento.',

    whatsNewTitle: 'Novità',
    featureLayout: 'Nuovo layout',
    featureSpeed: 'Caricamento più rapido',
    featureStudents: 'Creazione studenti',
    featureTasks: 'Assegna compiti e monitora i risultati',
    featurePrivacy: 'Conforme al GDPR senza nomi reali',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('de');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('atw_preferred_lang') as Language;
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch (e) {}
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('atw_preferred_lang', lang);
    } catch (e) {}
  };

  const t = translations[language] || translations.de;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
