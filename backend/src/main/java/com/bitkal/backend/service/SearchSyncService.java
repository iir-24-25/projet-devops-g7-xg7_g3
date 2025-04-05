package com.bitkal.backend.service;

import com.bitkal.backend.model.doc.SearchSystemDoc;
import com.bitkal.backend.model.entity.*;
import com.bitkal.backend.model.entity.Module;
import com.bitkal.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.IndexOperations;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.IndexQuery;
import org.springframework.data.elasticsearch.core.query.IndexQueryBuilder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SearchSyncService {

    @Autowired
    private ElasticsearchOperations elasticsearchOperations;

    @Autowired
    private AbsencesRepo absencesRepository;
    @Autowired
    private PersonneRepo personneRepository;
    @Autowired
    private CoursRepo coursRepository;
    @Autowired
    private EmploiTempsRepo emploiTempsRepository;
    @Autowired
    private EtablissementRepo etablissementRepository;
    @Autowired
    private GroupRepo groupRepository;
    @Autowired
    private JustificationRepo justificationRepository;
    @Autowired
    private ModuleRepo moduleRepository;
    @Autowired
    private NotificationsRepo notificationsRepository;
    @Autowired
    private SeanceRepo seanceRepository;
    @Autowired
    private VacancesRepo vacancesRepository;

    @PostConstruct
    public void indexAllData() {
        IndexOperations indexOps = elasticsearchOperations.indexOps(IndexCoordinates.of("global_search"));
        indexOps.delete();
        indexOps.create();

        indexAbsences();
        indexPersonnes();
        indexCours();
        indexEmploiTemps();
        indexEtablissements();
        indexGroups();
        indexJustifications();
        indexModules();
        indexNotifications();
        indexSeances();
        indexVacances();
    }

    private void indexAbsences() {
        List<Absences> absences = absencesRepository.findAll();
        if (absences == null || absences.isEmpty()) {
            System.out.println("Aucune absence trouvée, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = absences.stream().map(absence -> {
            String content = String.format("%s %s", absence.getDateAbsences(), absence.getSalle());
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Absences_" + absence.getId())
                    .type("Absences")
                    .content(content)
                    .entityId(absence.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexPersonnes() {
        List<Personne> personnes = personneRepository.findAll();
        if (personnes == null || personnes.isEmpty()) {
            System.out.println("Aucune personne trouvée, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = personnes.stream().map(personne -> {
            String content = String.format("%s %s %s", personne.getNom(), personne.getPrenom(), personne.getEmail());
            String type = switch (personne.getClass().getSimpleName()) {
                case "Admin" -> "Admin";
                case "Etudiant" -> "Etudiant";
                case "Parents" -> "Parents";
                case "Professeur" -> "Professeur";
                default -> "Unknown";
            };
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id(type + "_" + personne.getId())
                    .type(type)
                    .content(content)
                    .entityId(personne.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexCours() {
        List<Cours> cours = coursRepository.findAll();
        if (cours == null || cours.isEmpty()) {
            System.out.println("Aucun cours trouvé, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = cours.stream().map(c -> {
            String content = String.format("%s %s", c.getModule().getTitre(), c.getProfesseur().getNom());
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Cours_" + c.getId())
                    .type("Cours")
                    .content(content)
                    .entityId(c.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexEmploiTemps() {
        List<EmploiTemps> emploiTemps = emploiTempsRepository.findAll();
        if (emploiTemps == null || emploiTemps.isEmpty()) {
            System.out.println("Aucun emploi du temps trouvé, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = emploiTemps.stream().map(et -> {
            String content = String.format("%s %s %s %s", et.getJour(), et.getSalle(), et.getSeance(), et.getSemestre());
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("EmploiTemps_" + et.getId())
                    .type("EmploiTemps")
                    .content(content)
                    .entityId(et.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexEtablissements() {
        List<Etablissement> etablissements = etablissementRepository.findAll();
        if (etablissements == null || etablissements.isEmpty()) {
            System.out.println("Aucun établissement trouvé, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = etablissements.stream().map(e -> {
            String content = String.format("%s %s", e.getName(), e.getVille());
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Etablissement_" + e.getId())
                    .type("Etablissement")
                    .content(content)
                    .entityId(e.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexGroups() {
        List<Group> groups = groupRepository.findAll();
        if (groups == null || groups.isEmpty()) {
            System.out.println("Aucun groupe trouvé, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = groups.stream().map(g -> {
            String content = String.format("%s %s %s", g.getName(), g.getFiliere(), g.getNiveau());
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Group_" + g.getId())
                    .type("Group")
                    .content(content)
                    .entityId(g.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexJustifications() {
        List<Justification> justifications = justificationRepository.findAll();
        if (justifications == null || justifications.isEmpty()) {
            System.out.println("Aucune justification trouvée, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = justifications.stream().map(j -> {
            String content = j.getDescription();
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Justification_" + j.getId())
                    .type("Justification")
                    .content(content)
                    .entityId(j.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexModules() {
        List<Module> modules = moduleRepository.findAll();
        if (modules == null || modules.isEmpty()) {
            System.out.println("Aucun module trouvé, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = modules.stream().map(m -> {
            String content = String.format("%s %s %s", m.getTitre(), m.getFiliere(), m.getNiveau());
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Module_" + m.getId())
                    .type("Module")
                    .content(content)
                    .entityId(m.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexNotifications() {
        List<Notifications> notifications = notificationsRepository.findAll();
        if (notifications == null || notifications.isEmpty()) {
            System.out.println("Aucune notification trouvée, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = notifications.stream().map(n -> {
            String content = n.getMessage();
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Notifications_" + n.getId())
                    .type("Notifications")
                    .content(content)
                    .entityId(n.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexSeances() {
        List<Seance> seances = seanceRepository.findAll();
        if (seances == null || seances.isEmpty()) {
            System.out.println("Aucune séance trouvée, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = seances.stream().map(s -> {
            String content = String.format("%s %s", s.getHeureDebut(), s.getModule().getTitre());
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Seance_" + s.getId())
                    .type("Seance")
                    .content(content)
                    .entityId(s.getId())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }

    private void indexVacances() {
        List<Vacances> vacances = vacancesRepository.findAll();
        if (vacances == null || vacances.isEmpty()) {
            System.out.println("Aucune vacances trouvée, rien à indexer.");
            return;
        }
        List<IndexQuery> queries = vacances.stream().map(v -> {
            String content = v.getNom();
            SearchSystemDoc doc = SearchSystemDoc.builder()
                    .id("Vacances_" + v.getIdEvenement())
                    .type("Vacances")
                    .content(content)
                    .entityId(v.getIdEvenement())
                    .build();
            return new IndexQueryBuilder()
                    .withId(doc.getId())
                    .withObject(doc)
                    .build();
        }).collect(Collectors.toList());
        elasticsearchOperations.bulkIndex(queries, IndexCoordinates.of("global_search"));
    }
}