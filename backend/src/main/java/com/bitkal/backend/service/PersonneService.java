package com.bitkal.backend.service;

import com.bitkal.backend.constant.Filiere;
import com.bitkal.backend.model.dto.LoginResponseDTO;
import com.bitkal.backend.model.entity.Etudiant;
import com.bitkal.backend.model.entity.Personne;
import com.bitkal.backend.model.repository.PersonneRepo;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class PersonneService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PersonneRepo personneRepo;

    public Optional<LoginResponseDTO> login(String email, String password) {
        return personneRepo.findByEmailAndPassword(email, password);
    }

    public int envoyerEmailAvecNumeroTemporaire(String emailDestinataire) throws MessagingException {
        // Vérifier si l'email existe dans la base
        if (!findByEmail(emailDestinataire)) {
            System.out.println("Email non trouvé dans la base de données : " + emailDestinataire);
            return -1; // Retourne -1 si l'email n'existe pas
        }

        // Générer un numéro temporaire de 6 chiffres
        Random random = new Random();
        int numeroTemporaire = 100000 + random.nextInt(900000);
        String code = String.valueOf(numeroTemporaire);

        // Construire le contenu HTML avec le code inséré
        String htmlContent = buildEmailTemplate(code);

        // Créer un MimeMessage pour le contenu HTML
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        try {
            helper.setTo(emailDestinataire);
            helper.setSubject("Code de Vérification BitKal");
            helper.setText(htmlContent, true);
            helper.setFrom("k8a8l8i8d8@gmail.com");

            mailSender.send(message);
            System.out.println("Email envoyé avec succès à " + emailDestinataire);
            return numeroTemporaire; // Retourne le code en cas de succès
        } catch (MessagingException e) {
            System.err.println("Erreur lors de l'envoi de l'email : " + e.getMessage());
            throw e;
        }
    }

    private String buildEmailTemplate(String code) {
        // Séparer les chiffres du code
        String[] digits = code.split("");
        String codeHtml = "<div class=\"code-digits\">";
        for (String digit : digits) {
            codeHtml += "<div class=\"digit\">" + digit + "</div>";
        }
        codeHtml += "</div>";

        // Construire le HTML en insérant les chiffres dynamiquement
        return """
                <!DOCTYPE html>
                <html>
                <head>
                  <meta charset="utf-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Code de Vérification BitKal</title>
                  <style>
                    body {
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      line-height: 1.6;
                      color: #333333;
                      margin: 0;
                      padding: 0;
                      background-color: #f5f5f5;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border-radius: 8px;
                      overflow: hidden;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    }
                    .header {
                      text-align: center;
                      padding: 30px 0;
                      background: linear-gradient(135deg, #c7fceb 0%, #a0e0c9 100%);
                      color: #333333;
                    }
                    .logo {
                      margin-bottom: 15px;
                      font-size: 28px;
                      font-weight: bold;
                    }
                    .content {
                      padding: 40px 30px;
                    }
                    .code-box {
                      margin: 30px auto;
                      text-align: center;
                      max-width: 320px;
                    }
                    .code-digits {
                      display: flex;
                      justify-content: center;
                      gap: 8px;
                    }
                    .digit {
                      width: 40px;
                      height: 50px;
                      background-color: #fcfcd4;
                      border: 1px solid #e5e7c0;
                      border-radius: 6px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 24px;
                      font-weight: bold;
                      color: #333333;
                    }
                    .instructions {
                      margin: 30px 0;
                      padding: 20px;
                      background-color: #f9fafb;
                      border-radius: 6px;
                      border-left: 4px solid #c7fceb;
                    }
                    .button-container {
                      text-align: center;
                      margin: 30px 0;
                    }
                    .button {
                      display: inline-block;
                      padding: 12px 28px;
                      background-color: #c7fceb;
                      color: #333333;
                      text-decoration: none;
                      border-radius: 6px;
                      font-weight: 600;
                      transition: background-color 0.2s;
                      border: 1px solid #a0e0c9;
                    }
                    .button:hover {
                      background-color: #a0e0c9;
                    }
                    .expiry {
                      font-size: 14px;
                      color: #666666;
                      text-align: center;
                      margin-top: 20px;
                      padding: 10px;
                      background-color: #fcfcd4;
                      border-radius: 4px;
                    }
                    .footer {
                      text-align: center;
                      padding: 20px;
                      font-size: 12px;
                      color: #666666;
                      background-color: #f9fafb;
                      border-top: 1px solid #e5e7eb;
                    }
                    @media only screen and (max-width: 600px) {
                      .container {
                        width: 100%;
                        border-radius: 0;
                      }
                      .content {
                        padding: 30px 20px;
                      }
                      .code-digits {
                        gap: 6px;
                      }
                      .digit {
                        width: 36px;
                        height: 45px;
                        font-size: 20px;
                      }
                    }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <div class="logo">BitKal</div>
                      <h1>Vérification de Sécurité</h1>
                    </div>
                    <div class="content">
                      <p>Bonjour,</p>
                      <p>Pour réinitialiser votre mot de passe, veuillez utiliser le code de vérification à 6 chiffres ci-dessous :</p>
                      <div class="code-box">
                        <div class="code-digits">
                        """ + codeHtml + """ 
                        </div>
                      </div>
                      <div class="instructions">
                        <strong>Comment utiliser ce code :</strong>
                        <ol>
                          <li>Retournez à la page de réinitialisation de mot de passe</li>
                          <li>Saisissez le code à 6 chiffres ci-dessus</li>
                          <li>Créez votre nouveau mot de passe</li>
                        </ol>
                      </div>
                      <div class="button-container">
                        <a href="#" class="button">Réinitialiser mon mot de passe</a>
                      </div>
                      <p class="expiry">Ce code expirera dans <strong>60 minutes</strong>.</p>
                      <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email ou contacter notre équipe de support.</p>
                    </div>
                    <div class="footer">
                      <p>© 2025 BitKal. Tous droits réservés.</p>
                      <p>Ceci est un message automatique, veuillez ne pas répondre à cet email.</p>
                    </div>
                  </div>
                </body>
                </html>
                """;
    }

    public boolean findByEmail(String email) {
        int resultFindByEmail = personneRepo.findByEmail(email);
        return resultFindByEmail != 0;
    }

    @Transactional
    public boolean setPasswordByEmail(String email, String password) {
      int number = personneRepo.setPasswordByEmail(email, password);
      return number > 0;
    }

    public Map<String, Integer> numberGenderByType(String type) {
        Class<? extends Personne> types;
        switch (type.toUpperCase()) {
            case "ETUD":
                types = Etudiant.class;
                break;
            default:
                throw new IllegalArgumentException("Type inconnu : " + type);
        }

        List<Object[]> results = personneRepo.numberEtudiantByType(types);
        Map<String, Integer> genderCountMap = new HashMap<>();

        for (Object[] result : results) {
            String genderStr = result[0].toString();
            Integer count = ((Number) result[1]).intValue();
            genderCountMap.put(genderStr, count);
        }

        return genderCountMap;
    }

    public Map<String, Integer> numberPersonneByType() {
        List<Object[]> results = personneRepo.numberPersonneByType();
        Map<String, Integer> resultMap = new HashMap<>();

        for (Object[] row : results) {
            String typeName = ((Class<?>) row[0]).getSimpleName(); // TYPE(p)
            Integer count = ((Number) row[1]).intValue(); // COUNT(p)
            resultMap.put(typeName, count);
        }

        return resultMap;
    }

    public Map<String, Integer> findFilierePersonCount() {
      Pageable pageable = PageRequest.of(0, 25);
      List<Object[]> results = personneRepo.findFilierePersonCount(pageable);
      Map<String, Integer> resultMap = new HashMap<>();
  
      for (Object[] row : results) {
          String typeName = ((Filiere) row[0]).name();
          Integer count = ((Number) row[1]).intValue();
          resultMap.put(typeName, count);
      }
  
      return resultMap;
    }

}