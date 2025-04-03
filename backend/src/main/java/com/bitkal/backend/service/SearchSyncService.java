package com.bitkal.backend.service;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import com.bitkal.backend.model.entity.*;
import com.bitkal.backend.model.entity.Module;
import com.bitkal.backend.repository.*;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchSyncService {
    private static final Logger logger = LoggerFactory.getLogger(SearchSyncService.class);
    private static final int BATCH_SIZE = 100;

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
    private final EntityManager entityManager;

    @Transactional
    public void syncAllExistingData() {
        try {
            logger.info("Starting full data synchronization...");
            
            syncAllAbsences();
            syncAllEtudiants();
            syncAllSeances();
            syncAllCours();
            syncAllModules();
            syncAllProfesseurs();
            syncAllGroups();
            syncAllEmploiTemps();
            syncAllEtablissements();
            syncAllNotifications();
            syncAllJustifications();
            syncAllParents();
            syncAllVacances();
            syncAllAdmins();
            
            logger.info("Data synchronization completed successfully");
        } catch (Exception e) {
            logger.error("Data synchronization failed", e);
            throw e;
        }
    }

    // Méthodes de synchronisation paginées génériques
    private <T> void paginatedSync(Function<PageRequest, Page<T>> fetcher, 
                                 Function<T, SearchSystemDoc> mapper, 
                                 String entityName) {
        int page = 0;
        Page<T> batch;
        do {
            batch = fetcher.apply(PageRequest.of(page, BATCH_SIZE));
            if (batch.hasContent()) {
                List<SearchSystemDoc> docs = batch.getContent().stream()
                    .map(mapper)
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());
                
                searchSystemRepo.saveAll(docs);
                entityManager.clear();
                
                logger.info("Processed {} {} records (page {} of {})", 
                    batch.getNumberOfElements(),
                    entityName,
                    page + 1,
                    batch.getTotalPages());
                page++;
            }
        } while (batch != null && batch.hasNext());
    }

    // Méthodes spécifiques pour chaque entité
    private void syncAllAbsences() {
        paginatedSync(absencesRepo::findAllWithRelations, this::createAbsenceDocument, "absence");
    }

    private void syncAllEtudiants() {
        paginatedSync(etudiantRepo::findAllWithRelations, this::createEtudiantDocument, "etudiant");
    }

    private void syncAllSeances() {
        paginatedSync(seanceRepo::findAllWithRelations, this::createSeanceDocument, "seance");
    }

    private void syncAllCours() {
        paginatedSync(coursRepo::findAllWithRelations, this::createCoursDocument, "cours");
    }

    private void syncAllModules() {
        paginatedSync(moduleRepo::findAllWithRelations, this::createModuleDocument, "module");
    }

    private void syncAllProfesseurs() {
        paginatedSync(professeurRepo::findAllWithRelations, this::createProfesseurDocument, "professeur");
    }

    private void syncAllGroups() {
        paginatedSync(groupRepo::findAllWithRelations, this::createGroupDocument, "group");
    }

    private void syncAllEmploiTemps() {
        paginatedSync(emploiTempsRepo::findAllWithRelations, this::createEmploiTempsDocument, "emploiTemps");
    }

    private void syncAllEtablissements() {
        paginatedSync(etablissementRepo::findAllWithRelations, this::createEtablissementDocument, "etablissement");
    }

    private void syncAllNotifications() {
        paginatedSync(notificationsRepo::findAllWithRelations, this::createNotificationDocument, "notification");
    }

    private void syncAllJustifications() {
        paginatedSync(justificationRepo::findAllWithRelations, this::createJustificationDocument, "justification");
    }

    private void syncAllParents() {
        paginatedSync(parentsRepo::findAllWithRelations, this::createParentsDocument, "parents");
    }

    private void syncAllVacances() {
        paginatedSync(vacancesRepo::findAll, this::createVacancesDocument, "vacances");
    }

    private void syncAllAdmins() {
        paginatedSync(adminRepo::findAll, this::createAdminDocument, "admin");
    }

    // Méthodes de création de documents
    private SearchSystemDoc createAbsenceDocument(Absences absence) {
        if (absence.getEtudiant() == null) {
            logger.warn("Invalid absence with ID: {}", absence.getId());
            return null;
        }

        return SearchSystemDoc.builder()
            .id("absence_" + absence.getId())
            .type("absence")
            .content(buildAbsenceContent(absence))
            .date(absence.getDateAbsences() != null ? new Date(absence.getDateAbsences().getTime()) : null)
            .relationId(absence.getEtudiant().getId().toString())
            .relationName(absence.getEtudiant().getSom() + " " + absence.getEtudiant().getPrenom())
            .build();
    }

    private SearchSystemDoc createEtudiantDocument(Etudiant etudiant) {
        return SearchSystemDoc.builder()
            .id("etudiant_" + etudiant.getId())
            .type("etudiant")
            .content(buildEtudiantContent(etudiant))
            .date(null)
            .relationId(etudiant.getGroup() != null ? etudiant.getGroup().getId().toString() : null)
            .relationName(etudiant.getSom() + " " + etudiant.getPrenom())
            .build();
    }

    private SearchSystemDoc createSeanceDocument(Seance seance) {
        return SearchSystemDoc.builder()
            .id("seance_" + seance.getId())
            .type("seance")
            .content(buildSeanceContent(seance))
            .date(null)
            .relationId(seance.getModule() != null ? seance.getModule().getId().toString() : null)
            .relationName(seance.getModule() != null ? seance.getModule().getTitre() : null)
            .build();
    }

    private SearchSystemDoc createCoursDocument(Cours cours) {
        return SearchSystemDoc.builder()
            .id("cours_" + cours.getId())
            .type("cours")
            .content(buildCoursContent(cours))
            .date(null)
            .relationId(cours.getProfesseur() != null ? cours.getProfesseur().getId().toString() : null)
            .relationName(cours.getProfesseur() != null ? 
                cours.getProfesseur().getSom() + " " + cours.getProfesseur().getPrenom() : null)
            .build();
    }

    private SearchSystemDoc createModuleDocument(Module module) {
        return SearchSystemDoc.builder()
            .id("module_" + module.getId())
            .type("module")
            .content(buildModuleContent(module))
            .date(null)
            .relationId(null)
            .relationName(module.getTitre())
            .build();
    }

    private SearchSystemDoc createProfesseurDocument(Professeur professeur) {
        return SearchSystemDoc.builder()
            .id("professeur_" + professeur.getId())
            .type("professeur")
            .content(buildProfesseurContent(professeur))
            .date(null)
            .relationId(null)
            .relationName(professeur.getSom() + " " + professeur.getPrenom())
            .build();
    }

    private SearchSystemDoc createGroupDocument(Group group) {
        return SearchSystemDoc.builder()
            .id("group_" + group.getId())
            .type("group")
            .content(buildGroupContent(group))
            .date(null)
            .relationId(group.getEtablissement() != null ? group.getEtablissement().getId().toString() : null)
            .relationName(group.getName())
            .build();
    }

    private SearchSystemDoc createEmploiTempsDocument(EmploiTemps emploiTemps) {
        return SearchSystemDoc.builder()
            .id("emploiTemps_" + emploiTemps.getId())
            .type("emploiTemps")
            .content(buildEmploiTempsContent(emploiTemps))
            .date(null)
            .relationId(emploiTemps.getGroupe() != null ? emploiTemps.getGroupe().getId().toString() : null)
            .relationName(emploiTemps.getGroupe() != null ? emploiTemps.getGroupe().getName() : null)
            .build();
    }

    private SearchSystemDoc createEtablissementDocument(Etablissement etablissement) {
        return SearchSystemDoc.builder()
            .id("etablissement_" + etablissement.getId())
            .type("etablissement")
            .content(buildEtablissementContent(etablissement))
            .date(null)
            .relationId(null)
            .relationName(etablissement.getName())
            .build();
    }

    private SearchSystemDoc createNotificationDocument(Notifications notification) {
        return SearchSystemDoc.builder()
            .id("notification_" + notification.getId())
            .type("notification")
            .content(buildNotificationContent(notification))
            .date(notification.getDateEnvoi() != null ? Date.valueOf(notification.getDateEnvoi()) : null)
            .relationId(notification.getPersonne() != null ? notification.getPersonne().getId().toString() : null)
            .relationName(notification.getPersonne() != null ? 
                notification.getPersonne().getSom() + " " + notification.getPersonne().getPrenom() : null)
            .build();
    }

    private SearchSystemDoc createJustificationDocument(Justification justification) {
        return SearchSystemDoc.builder()
            .id("justification_" + justification.getId())
            .type("justification")
            .content(buildJustificationContent(justification))
            .date(justification.getDateSoumission() != null ? Date.valueOf(justification.getDateSoumission()) : null)
            .relationId(justification.getAbsence() != null && justification.getAbsence().getEtudiant() != null ? 
                justification.getAbsence().getEtudiant().getId().toString() : null)
            .relationName(justification.getAbsence() != null && justification.getAbsence().getEtudiant() != null ? 
                justification.getAbsence().getEtudiant().getSom() + " " + 
                justification.getAbsence().getEtudiant().getPrenom() : null)
            .build();
    }

    private SearchSystemDoc createParentsDocument(Parents parents) {
        return SearchSystemDoc.builder()
            .id("parents_" + parents.getId())
            .type("parents")
            .content(buildParentsContent(parents))
            .date(null)
            .relationId(null)
            .relationName(parents.getSom() + " " + parents.getPrenom())
            .build();
    }

    private SearchSystemDoc createVacancesDocument(Vacances vacances) {
        return SearchSystemDoc.builder()
            .id("vacances_" + vacances.getIdEvenement())
            .type("vacances")
            .content(buildVacancesContent(vacances))
            .date(vacances.getDateDebut() != null ? Date.valueOf(vacances.getDateDebut()) : null)
            .relationId(null)
            .relationName(vacances.getNom())
            .build();
    }

    private SearchSystemDoc createAdminDocument(Admin admin) {
        return SearchSystemDoc.builder()
            .id("admin_" + admin.getId())
            .type("admin")
            .content(buildAdminContent(admin))
            .date(null)
            .relationId(null)
            .relationName(admin.getSom() + " " + admin.getPrenom())
            .build();
    }

    // Méthodes de construction du contenu
    private String buildAbsenceContent(Absences absence) {
        StringBuilder content = new StringBuilder()
            .append(absence.getId()).append(" ")
            .append(absence.getDateAbsences()).append(" ")
            .append(absence.getIsJustif() != null ? absence.getIsJustif() : "null").append(" ")
            .append(absence.getEtudiant().getSom()).append(" ")
            .append(absence.getEtudiant().getPrenom()).append(" ")
            .append(absence.getEtudiant().getEmail());

        appendIfNotNull(content, " ", absence.getSeance(), s -> s.getModule().getTitre());
        appendIfNotNull(content, " ", absence.getNotification(), n -> n.getMessage());
        appendIfNotNull(content, " ", absence.getJustification(), j -> j.getDescription());
        appendIfNotNull(content, " ", absence.getSalle(), Enum::name);

        return content.toString().trim();
    }

    private String buildEtudiantContent(Etudiant etudiant) {
        StringBuilder content = new StringBuilder()
            .append(etudiant.getId()).append(" ")
            .append(etudiant.getSom()).append(" ")
            .append(etudiant.getPrenom()).append(" ")
            .append(etudiant.getEmail());

        appendIfNotNull(content, " ", etudiant.getNiveau(), Enum::name);
        appendIfNotNull(content, " ", etudiant.getFiliere(), Enum::name);
        appendIfNotNull(content, " ", etudiant.getAddressMAC());
        appendIfNotNull(content, " ", etudiant.getGroup(), Group::getName);

        return content.toString().trim();
    }

    private String buildSeanceContent(Seance seance) {
        StringBuilder content = new StringBuilder()
            .append(seance.getId());

        appendIfNotNull(content, " ", seance.getHeureDebut());
        appendIfNotNull(content, " ", seance.getHeureFin());
        appendIfNotNull(content, " ", seance.getModule(), m -> m.getTitre());
        appendIfNotNull(content, " ", seance.getEmploiTemp(), e -> e.getJour().name());

        return content.toString().trim();
    }

    private String buildCoursContent(Cours cours) {
        StringBuilder content = new StringBuilder()
            .append(cours.getId());

        appendIfNotNull(content, " ", cours.getModule(), m -> m.getTitre());
        appendIfNotNull(content, " ", cours.getProfesseur(), 
            p -> p.getSom() + " " + p.getPrenom());

        return content.toString().trim();
    }

    private String buildModuleContent(Module module) {
        StringBuilder content = new StringBuilder()
            .append(module.getId()).append(" ")
            .append(module.getTitre());

        appendIfNotNull(content, " ", module.getFiliere(), Enum::name);
        appendIfNotNull(content, " ", module.getNiveau(), Enum::name);
        appendIfNotNull(content, " ", module.getSemestre(), Enum::name);
        content.append(" ").append(module.getWeeklyHours());
        content.append(" ").append(module.getIsPratique() != null ? module.getIsPratique() : "null");

        return content.toString().trim();
    }

    private String buildProfesseurContent(Professeur professeur) {
        StringBuilder content = new StringBuilder()
            .append(professeur.getId()).append(" ")
            .append(professeur.getSom()).append(" ")
            .append(professeur.getPrenom()).append(" ")
            .append(professeur.getEmail());

        appendIfNotNull(content, " ", professeur.getSpecialisation());

        return content.toString().trim();
    }

    private String buildGroupContent(Group group) {
        StringBuilder content = new StringBuilder()
            .append(group.getId()).append(" ")
            .append(group.getName());

        appendIfNotNull(content, " ", group.getFiliere(), Enum::name);
        appendIfNotNull(content, " ", group.getNiveau(), Enum::name);
        appendIfNotNull(content, " ", group.getEtablissement(), Etablissement::getName);

        return content.toString().trim();
    }

    private String buildEmploiTempsContent(EmploiTemps emploiTemps) {
        StringBuilder content = new StringBuilder()
            .append(emploiTemps.getId());

        appendIfNotNull(content, " ", emploiTemps.getJour(), Enum::name);
        appendIfNotNull(content, " ", emploiTemps.getSalle(), Enum::name);
        appendIfNotNull(content, " ", emploiTemps.getSeance(), Enum::name);
        appendIfNotNull(content, " ", emploiTemps.getSemestre(), Enum::name);
        appendIfNotNull(content, " ", emploiTemps.getGroupe(), Group::getName);

        return content.toString().trim();
    }

    private String buildEtablissementContent(Etablissement etablissement) {
        StringBuilder content = new StringBuilder()
            .append(etablissement.getId()).append(" ")
            .append(etablissement.getName());

        appendIfNotNull(content, " ", etablissement.getVille(), Enum::name);

        return content.toString().trim();
    }

    private String buildNotificationContent(Notifications notification) {
        StringBuilder content = new StringBuilder()
            .append(notification.getId());

        appendIfNotNull(content, " ", notification.getMessage());
        appendIfNotNull(content, " ", notification.getDateEnvoi());
        appendIfNotNull(content, " ", notification.getPersonne(), 
            p -> p.getSom() + " " + p.getPrenom());

        return content.toString().trim();
    }

    private String buildJustificationContent(Justification justification) {
        StringBuilder content = new StringBuilder()
            .append(justification.getId());

        appendIfNotNull(content, " ", justification.getDescription());
        appendIfNotNull(content, " ", justification.getDateSoumission());
        appendIfNotNull(content, " ", justification.getAbsence(), 
            a -> a.getEtudiant().getSom() + " " + a.getEtudiant().getPrenom());

        return content.toString().trim();
    }

    private String buildParentsContent(Parents parents) {
        StringBuilder content = new StringBuilder()
            .append(parents.getId()).append(" ")
            .append(parents.getSom()).append(" ")
            .append(parents.getPrenom()).append(" ")
            .append(parents.getEmail());

        appendIfNotNull(content, " ", parents.getTel());

        return content.toString().trim();
    }

    private String buildVacancesContent(Vacances vacances) {
        StringBuilder content = new StringBuilder()
            .append(vacances.getIdEvenement()).append(" ")
            .append(vacances.getNom());

        appendIfNotNull(content, " ", vacances.getDateDebut());
        appendIfNotNull(content, " ", vacances.getDateFin());

        return content.toString().trim();
    }

    private String buildAdminContent(Admin admin) {
        return new StringBuilder()
            .append(admin.getId()).append(" ")
            .append(admin.getSom()).append(" ")
            .append(admin.getPrenom()).append(" ")
            .append(admin.getEmail())
            .toString().trim();
    }

    // Méthodes helper
    private <T> void appendIfNotNull(StringBuilder sb, String delimiter, T value) {
        if (value != null) {
            sb.append(delimiter).append(value);
        }
    }

    private <T> void appendIfNotNull(StringBuilder sb, String delimiter, T value, Function<T, String> extractor) {
        if (value != null) {
            sb.append(delimiter).append(extractor.apply(value));
        }
    }
}