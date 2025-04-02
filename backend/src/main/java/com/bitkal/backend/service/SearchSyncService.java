package com.bitkal.backend.service;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import com.bitkal.backend.model.entity.*;
import com.bitkal.backend.model.entity.Module;
import com.bitkal.backend.repository.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchSyncService {
    private static final Logger logger = LoggerFactory.getLogger(SearchSyncService.class);

    private final SearchSystemRepo searchSystemRepo;
    private final AbsencesRepo absencesRepo;
    private final EtudiantRepo etudiantRepo;
    private final SeanceRepo seanceRepo;
    private final CoursRepo coursRepo;
    private final ModuleRepo moduleRepo;
    private final ProfesseurRepo professeurRepo;
    private final GroupRepo groupRepo;
    private final EmploiTempsRepo emploiTempsRepo;
    private final EtablissementRepo etablissementRepo;
    private final NotificationsRepo notificationsRepo;
    private final JustificationRepo justificationRepo;
    private final ParentsRepo parentsRepo;
    private final VacancesRepo vacancesRepo;
    private final AdminRepo adminRepo;


    @PostConstruct
    public void init() {
        try {
            List<Absences> absences = absencesRepo.findAllValidAbsences();
            absences.forEach(this::syncAbsence);
        } catch (Exception e) {
            logger.error("Failed to initialize search data", e);
            throw e;
        }
    }
    // Synchronisation pour Absences
    public void syncAbsence(Absences absence) {
        if (absence.getEtudiant() == null) {
            logger.warn("Absence ID {} has no associated Etudiant, skipping", absence.getId());
            return; // Ignore les absences sans étudiant
        }
        if (!(absence.getEtudiant() instanceof Etudiant)) {
            logger.error("Invalid etudiant type for absence ID {}: {}, skipping", 
                         absence.getId(), absence.getEtudiant().getClass().getName());
            return; // Ignore les absences avec un type incorrect
        }
    
        StringBuilder content = new StringBuilder();
        content.append(absence.getId()).append(" ");
        if (absence.getDateAbsences() != null) content.append(absence.getDateAbsences()).append(" ");
        content.append(absence.getIsJustif() != null ? absence.getIsJustif() : "null").append(" ");
        content.append(absence.getEtudiant().getSom()).append(" ")
               .append(absence.getEtudiant().getPrenom()).append(" ")
               .append(absence.getEtudiant().getEmail()).append(" ");
        if (absence.getSeance() != null && absence.getSeance().getModule() != null) 
            content.append(absence.getSeance().getModule().getTitre()).append(" ");
        if (absence.getNotification() != null) content.append(absence.getNotification().getMessage()).append(" ");
        if (absence.getJustification() != null) content.append(absence.getJustification().getDescription()).append(" ");
        if (absence.getSalle() != null) content.append(absence.getSalle().name()).append(" ");
    
        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("absence_" + absence.getId())
            .type("absence")
            .content(content.toString().trim())
            .date(absence.getDateAbsences() != null ? new Date(absence.getDateAbsences().getTime()) : null)
            .relationId(absence.getEtudiant().getId().toString())
            .relationName(absence.getEtudiant().getSom() + " " + absence.getEtudiant().getPrenom())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Etudiant
    public void syncEtudiant(Etudiant etudiant) {
        StringBuilder content = new StringBuilder();
        content.append(etudiant.getId()).append(" ")
               .append(etudiant.getSom()).append(" ")
               .append(etudiant.getPrenom()).append(" ")
               .append(etudiant.getEmail()).append(" ");
        if (etudiant.getNiveau() != null) content.append(etudiant.getNiveau().name()).append(" ");
        if (etudiant.getFiliere() != null) content.append(etudiant.getFiliere().name()).append(" ");
        if (etudiant.getAddressMAC() != null) content.append(etudiant.getAddressMAC()).append(" ");
        if (etudiant.getGroup() != null) content.append(etudiant.getGroup().getName()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("etudiant_" + etudiant.getId())
            .type("etudiant")
            .content(content.toString().trim())
            .date(null)
            .relationId(etudiant.getGroup() != null ? etudiant.getGroup().getId().toString() : null)
            .relationName(etudiant.getSom() + " " + etudiant.getPrenom())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Seance
    public void syncSeance(Seance seance) {
        StringBuilder content = new StringBuilder();
        content.append(seance.getId()).append(" ");
        if (seance.getHeureDebut() != null) content.append(seance.getHeureDebut()).append(" ");
        if (seance.getHeureFin() != null) content.append(seance.getHeureFin()).append(" ");
        if (seance.getModule() != null) content.append(seance.getModule().getTitre()).append(" ");
        if (seance.getEmploiTemp() != null) content.append(seance.getEmploiTemp().getJour().name()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("seance_" + seance.getId())
            .type("seance")
            .content(content.toString().trim())
            .date(null)
            .relationId(seance.getModule() != null ? seance.getModule().getId().toString() : null)
            .relationName(seance.getModule() != null ? seance.getModule().getTitre() : null)
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Cours
    public void syncCours(Cours cours) {
        StringBuilder content = new StringBuilder();
        content.append(cours.getId()).append(" ");
        if (cours.getModule() != null) content.append(cours.getModule().getTitre()).append(" ");
        if (cours.getProfesseur() != null) content.append(cours.getProfesseur().getSom()).append(" ")
                                                .append(cours.getProfesseur().getPrenom()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("cours_" + cours.getId())
            .type("cours")
            .content(content.toString().trim())
            .date(null)
            .relationId(cours.getProfesseur() != null ? cours.getProfesseur().getId().toString() : null)
            .relationName(cours.getProfesseur() != null ? 
                          cours.getProfesseur().getSom() + " " + cours.getProfesseur().getPrenom() : null)
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Module
    public void syncModule(Module module) {
        StringBuilder content = new StringBuilder();
        content.append(module.getId()).append(" ")
               .append(module.getTitre()).append(" ");
        if (module.getFiliere() != null) content.append(module.getFiliere().name()).append(" ");
        if (module.getNiveau() != null) content.append(module.getNiveau().name()).append(" ");
        if (module.getSemestre() != null) content.append(module.getSemestre().name()).append(" ");
        content.append(module.getWeeklyHours()).append(" ");
        content.append(module.getIsPratique() != null ? module.getIsPratique() : "null").append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("module_" + module.getId())
            .type("module")
            .content(content.toString().trim())
            .date(null)
            .relationId(null)
            .relationName(module.getTitre())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Professeur
    public void syncProfesseur(Professeur professeur) {
        StringBuilder content = new StringBuilder();
        content.append(professeur.getId()).append(" ")
               .append(professeur.getSom()).append(" ")
               .append(professeur.getPrenom()).append(" ")
               .append(professeur.getEmail()).append(" ");
        if (professeur.getSpecialisation() != null) content.append(professeur.getSpecialisation()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("professeur_" + professeur.getId())
            .type("professeur")
            .content(content.toString().trim())
            .date(null)
            .relationId(null)
            .relationName(professeur.getSom() + " " + professeur.getPrenom())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Group
    public void syncGroup(Group group) {
        StringBuilder content = new StringBuilder();
        content.append(group.getId()).append(" ")
               .append(group.getName()).append(" ");
        if (group.getFiliere() != null) content.append(group.getFiliere().name()).append(" ");
        if (group.getNiveau() != null) content.append(group.getNiveau().name()).append(" ");
        if (group.getEtablissement() != null) content.append(group.getEtablissement().getName()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("group_" + group.getId())
            .type("group")
            .content(content.toString().trim())
            .date(null)
            .relationId(group.getEtablissement() != null ? group.getEtablissement().getId().toString() : null)
            .relationName(group.getName())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour EmploiTemps
    public void syncEmploiTemps(EmploiTemps emploiTemps) {
        StringBuilder content = new StringBuilder();
        content.append(emploiTemps.getId()).append(" ");
        if (emploiTemps.getJour() != null) content.append(emploiTemps.getJour().name()).append(" ");
        if (emploiTemps.getSalle() != null) content.append(emploiTemps.getSalle().name()).append(" ");
        if (emploiTemps.getSeance() != null) content.append(emploiTemps.getSeance().name()).append(" "); // Modifié pour utiliser getId()
        if (emploiTemps.getSemestre() != null) content.append(emploiTemps.getSemestre().name()).append(" ");
        if (emploiTemps.getGroupe() != null) content.append(emploiTemps.getGroupe().getName()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("emploiTemps_" + emploiTemps.getId())
            .type("emploiTemps")
            .content(content.toString().trim())
            .date(null)
            .relationId(emploiTemps.getGroupe() != null ? emploiTemps.getGroupe().getId().toString() : null)
            .relationName(emploiTemps.getGroupe() != null ? emploiTemps.getGroupe().getName() : null)
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Etablissement
    public void syncEtablissement(Etablissement etablissement) {
        StringBuilder content = new StringBuilder();
        content.append(etablissement.getId()).append(" ")
               .append(etablissement.getName()).append(" ");
        if (etablissement.getVille() != null) content.append(etablissement.getVille().name()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("etablissement_" + etablissement.getId())
            .type("etablissement")
            .content(content.toString().trim())
            .date(null)
            .relationId(null)
            .relationName(etablissement.getName())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Notifications
    public void syncNotification(Notifications notification) {
        StringBuilder content = new StringBuilder();
        content.append(notification.getId()).append(" ");
        if (notification.getMessage() != null) content.append(notification.getMessage()).append(" ");
        if (notification.getDateEnvoi() != null) content.append(notification.getDateEnvoi()).append(" ");
        if (notification.getPersonne() != null) content.append(notification.getPersonne().getSom()).append(" ")
                                                      .append(notification.getPersonne().getPrenom()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("notification_" + notification.getId())
            .type("notification")
            .content(content.toString().trim())
            .date(notification.getDateEnvoi() != null ? Date.valueOf(notification.getDateEnvoi()) : null)
            .relationId(notification.getPersonne() != null ? notification.getPersonne().getId().toString() : null)
            .relationName(notification.getPersonne() != null ? 
                          notification.getPersonne().getSom() + " " + notification.getPersonne().getPrenom() : null)
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Justification
    public void syncJustification(Justification justification) {
        StringBuilder content = new StringBuilder();
        content.append(justification.getId()).append(" ");
        if (justification.getDescription() != null) content.append(justification.getDescription()).append(" ");
        if (justification.getDateSoumission() != null) content.append(justification.getDateSoumission()).append(" ");
        if (justification.getAbsence() != null && justification.getAbsence().getEtudiant() != null)
            content.append(justification.getAbsence().getEtudiant().getSom()).append(" ")
                   .append(justification.getAbsence().getEtudiant().getPrenom()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("justification_" + justification.getId())
            .type("justification")
            .content(content.toString().trim())
            .date(justification.getDateSoumission() != null ? Date.valueOf(justification.getDateSoumission()) : null)
            .relationId(justification.getAbsence() != null && justification.getAbsence().getEtudiant() != null ? 
                        justification.getAbsence().getEtudiant().getId().toString() : null)
            .relationName(justification.getAbsence() != null && justification.getAbsence().getEtudiant() != null ? 
                          justification.getAbsence().getEtudiant().getSom() + " " + 
                          justification.getAbsence().getEtudiant().getPrenom() : null)
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Parents
    public void syncParents(Parents parents) {
        StringBuilder content = new StringBuilder();
        content.append(parents.getId()).append(" ")
               .append(parents.getSom()).append(" ")
               .append(parents.getPrenom()).append(" ")
               .append(parents.getEmail()).append(" ");
        if (parents.getTel() != null) content.append(parents.getTel()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("parents_" + parents.getId())
            .type("parents")
            .content(content.toString().trim())
            .date(null)
            .relationId(null)
            .relationName(parents.getSom() + " " + parents.getPrenom())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Vacances
    public void syncVacances(Vacances vacances) {
        StringBuilder content = new StringBuilder();
        content.append(vacances.getIdEvenement()).append(" ")
               .append(vacances.getNom()).append(" ");
        if (vacances.getDateDebut() != null) content.append(vacances.getDateDebut()).append(" ");
        if (vacances.getDateFin() != null) content.append(vacances.getDateFin()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("vacances_" + vacances.getIdEvenement())
            .type("vacances")
            .content(content.toString().trim())
            .date(vacances.getDateDebut() != null ? Date.valueOf(vacances.getDateDebut()) : null)
            .relationId(null)
            .relationName(vacances.getNom())
            .build();
        searchSystemRepo.save(doc);
    }

    // Synchronisation pour Admin
    public void syncAdmin(Admin admin) {
        StringBuilder content = new StringBuilder();
        content.append(admin.getId()).append(" ")
               .append(admin.getSom()).append(" ")
               .append(admin.getPrenom()).append(" ")
               .append(admin.getEmail()).append(" ");

        SearchSystemDoc doc = SearchSystemDoc.builder()
            .id("admin_" + admin.getId())
            .type("admin")
            .content(content.toString().trim())
            .date(null)
            .relationId(null)
            .relationName(admin.getSom() + " " + admin.getPrenom())
            .build();
        searchSystemRepo.save(doc);
    }

    @PostConstruct
    public void syncAllExistingData() {
        absencesRepo.findAll().forEach(this::syncAbsence);
        etudiantRepo.findAll().forEach(this::syncEtudiant);
        seanceRepo.findAll().forEach(this::syncSeance);
        coursRepo.findAll().forEach(this::syncCours);
        moduleRepo.findAll().forEach(this::syncModule);
        professeurRepo.findAll().forEach(this::syncProfesseur);
        groupRepo.findAll().forEach(this::syncGroup);
        emploiTempsRepo.findAll().forEach(this::syncEmploiTemps);
        etablissementRepo.findAll().forEach(this::syncEtablissement);
        notificationsRepo.findAll().forEach(this::syncNotification);
        justificationRepo.findAll().forEach(this::syncJustification);
        parentsRepo.findAll().forEach(this::syncParents);
        vacancesRepo.findAll().forEach(this::syncVacances);
        adminRepo.findAll().forEach(this::syncAdmin);
    }
}