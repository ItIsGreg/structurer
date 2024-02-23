import { EntityAttributes, OptionType, Outline, SectionInfo } from "../types";

export const isProd = () => {
  return process.env.NEXT_PUBLIC_ENV === "prod";
};

export const awsUrl = isProd()
  ? process.env.NEXT_PUBLIC_AWS_URL
  : "http://localhost:8002";

export const structurerUrl = isProd()
  ? process.env.NEXT_PUBLIC_STRUCTURER_URL
  : "http://localhost:8002";

export const segmentationCategories = [
  "Previous illnesses",
  "Allergies",
  "Laboratory and data results",
  "Discharge medications",
];

export const segmentationCategoriesGerman = [
  "Vorerkrankungen",
  "Allergien",
  "Laborwerte",
  "Entlassungsmedikation",
];

// gpt model selection
export const gptModelOptions = [
  { value: "gpt-3.5-turbo-0125", label: "gpt-3.5-turbo-0125" },
  { value: "gpt-4-turbo-preview", label: "gpt-4-turbo-preview" },
];

export const defaultGPTModel = "gpt-3.5-turbo-0125";

export const validFhirTypes = [
  "Address",
  "Age",
  "Annotation",
  "Attachment",
  "BackboneElement",
  "CodeableConcept",
  "CodeableReference",
  "Coding",
  "ContactDetail",
  "ContactPoint",
  "Contributor",
  "Count",
  "DataRequirement",
  "Distance",
  "Dosage",
  "Duration",
  "Element",
  "ElementDefinition",
  "Expression",
  "Extension",
  "HumanName",
  "Identifier",
  "MarketingStatus",
  "Meta",
  "Money",
  "MoneyQuantity",
  "Narrative",
  "ParameterDefinition",
  "Period",
  "Population",
  "ProdCharacteristic",
  "ProductShelfLife",
  "Quantity",
  "Range",
  "Ratio",
  "RatioRange",
  "Reference",
  "RelatedArtifact",
  "SampledData",
  "Signature",
  "SimpleQuantity",
  "Timing",
  "TriggerDefinition",
  "UsageContext",
  "base64Binary",
  "boolean",
  "canonical",
  "code",
  "date",
  "dateTime",
  "decimal",
  "id",
  "instant",
  "integer",
  "markdown",
  "oid",
  "positiveInt",
  "string",
  "time",
  "unsignedInt",
  "uri",
  "url",
  "uuid",
  "xhtml",
];

export const defaultResourceTypeAttributes: EntityAttributes = {
  Condition: ["onset", "clinicalStatus"],
  Medication: ["dosage", "ingredient"],
  Procedure: ["outcome"],
  Observation: ["value"],
  AllergyIntolerance: ["reaction"],
};

export const ConditionAttributes = [
  "clinicalStatus",
  "verificationStatus",
  "category",
  "severity",
  "code",
  "bodySite",
  "onset", // onset is [x]
  "abatement", // abatement is [x]
  "recordedDate",
  "stage",
];

export const MedicationAttributes = ["dosage", "ingredient", "status", "code"];

export const ProcedureAttributes = [
  "status",
  "category",
  "code",
  "performer",
  "location",
  "reason",
  "bodySite",
  "outcome",
  "report",
  "complication",
  "followUp",
];

export const ObservationAttributes = [
  "value",
  "interpretation",
  "method",
  "status",
  "category",
  "code",
  "specimen",
  "device",
  "referenceRange",
];

export const AllergyIntoleranceAttributes = [
  "clinicalStatus",
  "reaction",
  "verificationStatus",
  "type",
  "category",
  "criticality",
  "code",
  "onset", // onset is [x]
  "recordedDate",
];

export const ResourceTypeAttributeOptions: EntityAttributes = {
  Condition: ConditionAttributes,
  Medication: MedicationAttributes,
  Procedure: ProcedureAttributes,
  Observation: ObservationAttributes,
  AllergyIntolerance: AllergyIntoleranceAttributes,
};

export const primitiveTypes = [
  "base64Binary",
  "boolean",
  "canonical",
  "code",
  "date",
  "dateTime",
  "decimal",
  "Extension", // TODO: handle this
  "id",
  "instant",
  "integer",
  "integer64",
  "markdown",
  "oid",
  "positiveInt",
  "string",
  "time",
  "unsignedInt",
  "uri",
  "url",
  "uuid",
];

export const resourceTypeList = [
  // I want to move back from FHIR a bit, so I am going to limit this
  "Condition",
  "Medication",
  "Observation",
  "Procedure",
  "AllergyIntolerance",
];

export const defaultFocusResources: OptionType[] = [
  { value: "Condition", label: "Condition" },
];

export const resourcesToColor: OptionType[] = [
  { value: "Condition", label: "Condition" },
  { value: "Medication", label: "Medication" },
  { value: "Observation", label: "Observation" },
  { value: "Procedure", label: "Procedure" },
  { value: "AllergyIntolerance", label: "AllergyIntolerance" },
];

export const dummyOutline: Outline = {
  Medication: {
    MedicationRequest: [
      {
        item: "Taluvolul",
        matches: [[22, 44]],
      },
    ],
  },
  Nebendiagnosen: {
    Condition: [
      {
        item: "Colitis ulcerosa",
        matches: [[22, 44]],
      },
      {
        item: "Morbus Bechterew",
        matches: [[110, 333]],
      },
      {
        item: "Myokarditis",
        matches: [[555, 666]],
      },
      {
        item: "Hypertonie",
        matches: [[88, 99]],
      },
    ],
  },
};

const dummyText: string =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam aliquam, nisl nisl aliquam nisl, vitae aliquam n";

function generateDummyTextWithNewlines() {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n";

  let largeText = "";
  for (let i = 0; i < 20; i++) {
    // repeat 20 times, you can increase this number for larger text
    largeText += lorem + (i % 5 === 0 && i !== 0 ? "\n" : ""); // Add newline every 5 iterations, except the first
  }

  return largeText;
}

export const dummySections: SectionInfo[] = [
  {
    key: "Section0",
    startIndex: 1,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section1",
    startIndex: 2,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section3",
    startIndex: 3,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section4",
    startIndex: 4,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section5",
    startIndex: 5,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section6",
    startIndex: 6,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section7",
    startIndex: 7,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section8",
    startIndex: 8,
    endIndex: 100,
    // askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
];

export const resourceOptions: OptionType[] = [
  { value: "Account", label: "Account" },
  { value: "ActivityDefinition", label: "ActivityDefinition" },
  { value: "AdverseEvent", label: "AdverseEvent" },
  { value: "AllergyIntolerance", label: "AllergyIntolerance" },
  { value: "Appointment", label: "Appointment" },
  { value: "AppointmentResponse", label: "AppointmentResponse" },
  { value: "AuditEvent", label: "AuditEvent" },
  { value: "Basic", label: "Basic" },
  { value: "Binary", label: "Binary" },
  { value: "BiologicallyDerivedProduct", label: "BiologicallyDerivedProduct" },
  { value: "BodyStructure", label: "BodyStructure" },
  { value: "Bundle", label: "Bundle" },
  { value: "CapabilityStatement", label: "CapabilityStatement" },
  { value: "CarePlan", label: "CarePlan" },
  { value: "CareTeam", label: "CareTeam" },
  { value: "CatalogEntry", label: "CatalogEntry" },
  { value: "ChargeItem", label: "ChargeItem" },
  { value: "ChargeItemDefinition", label: "ChargeItemDefinition" },
  { value: "Claim", label: "Claim" },
  { value: "ClaimResponse", label: "ClaimResponse" },
  { value: "ClinicalImpression", label: "ClinicalImpression" },
  { value: "CodeSystem", label: "CodeSystem" },
  { value: "Communication", label: "Communication" },
  { value: "CommunicationRequest", label: "CommunicationRequest" },
  { value: "CompartmentDefinition", label: "CompartmentDefinition" },
  { value: "Composition", label: "Composition" },
  { value: "ConceptMap", label: "ConceptMap" },
  { value: "Condition", label: "Condition" },
  { value: "Consent", label: "Consent" },
  { value: "Contract", label: "Contract" },
  { value: "Coverage", label: "Coverage" },
  { value: "CoverageEligibilityRequest", label: "CoverageEligibilityRequest" },
  {
    value: "CoverageEligibilityResponse",
    label: "CoverageEligibilityResponse",
  },
  { value: "DetectedIssue", label: "DetectedIssue" },
  { value: "Device", label: "Device" },
  { value: "DeviceDefinition", label: "DeviceDefinition" },
  { value: "DeviceMetric", label: "DeviceMetric" },
  { value: "DeviceRequest", label: "DeviceRequest" },
  { value: "DeviceUseStatement", label: "DeviceUseStatement" },
  { value: "DiagnosticReport", label: "DiagnosticReport" },
  { value: "DocumentManifest", label: "DocumentManifest" },
  { value: "DocumentReference", label: "DocumentReference" },
  { value: "EffectEvidenceSynthesis", label: "EffectEvidenceSynthesis" },
  { value: "Encounter", label: "Encounter" },
  { value: "Endpoint", label: "Endpoint" },
  { value: "EnrollmentRequest", label: "EnrollmentRequest" },
  { value: "EnrollmentResponse", label: "EnrollmentResponse" },
  { value: "EpisodeOfCare", label: "EpisodeOfCare" },
  { value: "EventDefinition", label: "EventDefinition" },
  { value: "Evidence", label: "Evidence" },
  { value: "EvidenceVariable", label: "EvidenceVariable" },
  { value: "ExampleScenario", label: "ExampleScenario" },
  { value: "ExplanationOfBenefit", label: "ExplanationOfBenefit" },
  { value: "FamilyMemberHistory", label: "FamilyMemberHistory" },
  { value: "Flag", label: "Flag" },
  { value: "Goal", label: "Goal" },
  { value: "GraphDefinition", label: "GraphDefinition" },
  { value: "Group", label: "Group" },
  { value: "GuidanceResponse", label: "GuidanceResponse" },
  { value: "HealthcareService", label: "HealthcareService" },
  { value: "ImagingStudy", label: "ImagingStudy" },
  { value: "Immunization", label: "Immunization" },
  { value: "ImmunizationEvaluation", label: "ImmunizationEvaluation" },
  { value: "ImmunizationRecommendation", label: "ImmunizationRecommendation" },
  { value: "ImplementationGuide", label: "ImplementationGuide" },
  { value: "InsurancePlan", label: "InsurancePlan" },
  { value: "Invoice", label: "Invoice" },
  { value: "Library", label: "Library" },
  { value: "Linkage", label: "Linkage" },
  { value: "List", label: "List" },
  { value: "Location", label: "Location" },
  { value: "Measure", label: "Measure" },
  { value: "MeasureReport", label: "MeasureReport" },
  { value: "Media", label: "Media" },
  { value: "Medication", label: "Medication" },
  { value: "MedicationAdministration", label: "MedicationAdministration" },
  { value: "MedicationDispense", label: "MedicationDispense" },
  { value: "MedicationKnowledge", label: "MedicationKnowledge" },
  { value: "MedicationRequest", label: "MedicationRequest" },
  { value: "MedicationStatement", label: "MedicationStatement" },
  { value: "MedicinalProduct", label: "MedicinalProduct" },
  {
    value: "MedicinalProductAuthorization",
    label: "MedicinalProductAuthorization",
  },
  {
    value: "MedicinalProductContraindication",
    label: "MedicinalProductContraindication",
  },
  { value: "MedicinalProductIndication", label: "MedicinalProductIndication" },
  { value: "MedicinalProductIngredient", label: "MedicinalProductIngredient" },
  {
    value: "MedicinalProductInteraction",
    label: "MedicinalProductInteraction",
  },
  {
    value: "MedicinalProductManufactured",
    label: "MedicinalProductManufactured",
  },
  { value: "MedicinalProductPackaged", label: "MedicinalProductPackaged" },
  {
    value: "MedicinalProductPharmaceutical",
    label: "MedicinalProductPharmaceutical",
  },
  {
    value: "MedicinalProductUndesirableEffect",
    label: "MedicinalProductUndesirableEffect",
  },
  { value: "MessageDefinition", label: "MessageDefinition" },
  { value: "MessageHeader", label: "MessageHeader" },
  { value: "MolecularSequence", label: "MolecularSequence" },
  { value: "NamingSystem", label: "NamingSystem" },
  { value: "NutritionOrder", label: "NutritionOrder" },
  { value: "Observation", label: "Observation" },
  { value: "ObservationDefinition", label: "ObservationDefinition" },
  { value: "OperationDefinition", label: "OperationDefinition" },
  { value: "OperationOutcome", label: "OperationOutcome" },
  { value: "Organization", label: "Organization" },
  { value: "OrganizationAffiliation", label: "OrganizationAffiliation" },
  { value: "Parameters", label: "Parameters" },
  { value: "Patient", label: "Patient" },
  { value: "PaymentNotice", label: "PaymentNotice" },
  { value: "PaymentReconciliation", label: "PaymentReconciliation" },
  { value: "Person", label: "Person" },
  { value: "PlanDefinition", label: "PlanDefinition" },
  { value: "Practitioner", label: "Practitioner" },
  { value: "PractitionerRole", label: "PractitionerRole" },
  { value: "Procedure", label: "Procedure" },
  { value: "Provenance", label: "Provenance" },
  { value: "Questionnaire", label: "Questionnaire" },
  { value: "QuestionnaireResponse", label: "QuestionnaireResponse" },
  { value: "RelatedPerson", label: "RelatedPerson" },
  { value: "RequestGroup", label: "RequestGroup" },
  { value: "ResearchDefinition", label: "ResearchDefinition" },
  { value: "ResearchElementDefinition", label: "ResearchElementDefinition" },
  { value: "ResearchStudy", label: "ResearchStudy" },
  { value: "ResearchSubject", label: "ResearchSubject" },
  { value: "RiskAssessment", label: "RiskAssessment" },
  { value: "RiskEvidenceSynthesis", label: "RiskEvidenceSynthesis" },
  { value: "Schedule", label: "Schedule" },
  { value: "SearchParameter", label: "SearchParameter" },
  { value: "ServiceRequest", label: "ServiceRequest" },
  { value: "Slot", label: "Slot" },
  { value: "Specimen", label: "Specimen" },
  { value: "SpecimenDefinition", label: "SpecimenDefinition" },
  { value: "StructureDefinition", label: "StructureDefinition" },
  { value: "StructureMap", label: "StructureMap" },
  { value: "Subscription", label: "Subscription" },
  { value: "Substance", label: "Substance" },
  { value: "SubstanceNucleicAcid", label: "SubstanceNucleicAcid" },
  { value: "SubstancePolymer", label: "SubstancePolymer" },
  { value: "SubstanceProtein", label: "SubstanceProtein" },
  {
    value: "SubstanceReferenceInformation",
    label: "SubstanceReferenceInformation",
  },
  { value: "SubstanceSourceMaterial", label: "SubstanceSourceMaterial" },
  { value: "SubstanceSpecification", label: "SubstanceSpecification" },
  { value: "SupplyDelivery", label: "SupplyDelivery" },
  { value: "SupplyRequest", label: "SupplyRequest" },
  { value: "Task", label: "Task" },
  { value: "TerminologyCapabilities", label: "TerminologyCapabilities" },
  { value: "TestReport", label: "TestReport" },
  { value: "TestScript", label: "TestScript" },
  { value: "ValueSet", label: "ValueSet" },
  { value: "VerificationResult", label: "VerificationResult" },
  { value: "VisionPrescription", label: "VisionPrescription" },
];

export const colorSeed = "ello Darling, Do you know, where the Taj Mahal is?";

export const dummyOutlineWithResources = [
  {
    key: "Allergies",
    startIndex: 169,
    endIndex: 214,
    text: "Allergies: \nSulfonamides / Codeine / Bactrim\n",
    entities: {
      AllergyIntolerance: [
        {
          item: "Sulfonamides",
          matches: [[12, 24]],
          attributes: {
            clinicalStatus: "active",
            category: "medication",
            verificationStatus: "confirmed",
            snomed_code: "59255006",
            snomed_display: "Sulfonamide",
          },
          resources: [
            {
              resourceType: "AllergyIntolerance",
              clinicalStatus: {
                coding: [
                  {
                    system:
                      "http://hl7.org/fhir/ValueSet/allergyintolerance-clinical",
                    code: "active",
                  },
                ],
              },
              verificationStatus: {
                coding: [
                  {
                    system:
                      "http://hl7.org/fhir/ValueSet/allergyintolerance-verification",
                    code: "confirmed",
                  },
                ],
              },
              category: ["medication"],
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "59255006",
                    display: "Sulfonamide",
                  },
                ],
                text: "Sulfonamides",
              },
              patient: {
                reference: "test",
              },
            },
          ],
        },
        {
          item: "Codeine",
          matches: [[27, 34]],
          attributes: {
            clinicalStatus: "active",
            category: "medication",
            verificationStatus: "confirmed",
            snomed_code: "85990009",
            snomed_display: "Codeine",
          },
          resources: [
            {
              resourceType: "AllergyIntolerance",
              clinicalStatus: {
                coding: [
                  {
                    system:
                      "http://hl7.org/fhir/ValueSet/allergyintolerance-clinical",
                    code: "active",
                  },
                ],
              },
              verificationStatus: {
                coding: [
                  {
                    system:
                      "http://hl7.org/fhir/ValueSet/allergyintolerance-verification",
                    code: "confirmed",
                  },
                ],
              },
              category: ["medication"],
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "85990009",
                    display: "Codeine",
                  },
                ],
                text: "Codeine",
              },
              patient: {
                reference: "test",
              },
            },
          ],
        },
        {
          item: "Bactrim",
          matches: [[37, 44]],
          attributes: {
            clinicalStatus: "active",
            category: "medication",
            verificationStatus: "confirmed",
            snomed_code: "5220000",
            snomed_display: "Bacitracin",
          },
          resources: [
            {
              resourceType: "AllergyIntolerance",
              clinicalStatus: {
                coding: [
                  {
                    system:
                      "http://hl7.org/fhir/ValueSet/allergyintolerance-clinical",
                    code: "active",
                  },
                ],
              },
              verificationStatus: {
                coding: [
                  {
                    system:
                      "http://hl7.org/fhir/ValueSet/allergyintolerance-verification",
                    code: "confirmed",
                  },
                ],
              },
              category: ["medication"],
              code: {
                coding: [
                  {
                    system: "http://snomed.info/sct",
                    code: "5220000",
                    display: "Bacitracin",
                  },
                ],
                text: "Bactrim",
              },
              patient: {
                reference: "test",
              },
            },
          ],
        },
      ],
    },
  },
];

export const exampleDischargeSummaryDE = `
 
Name:  ___ Einheit Nr:   ___
 
Aufnahmedatum:  ___ Entlassungsdatum:   ___
 
Geburtsdatum:  ___ Geschlecht:   F
 
Dienst: CHIRURGIE
 
Allergien:
Sulfonamide / Kodein / Bactrim
 
Behandelnd: ___.
 
Hauptbeschwerde:
Unterleibsschmerzen und Erbrechen
 
Größerer chirurgischer oder invasiver Eingriff:
Explorative Laparotomie, Lysis von Verwachsungen, Dünndarmresektion
Dünndarmresektion mit Enteroenterostomie.

 
Aktuelle Krankheitsgeschichte:
Die Patientin ist eine ___ Jahre alte Frau, s/p Hysterektomie wegen Uterus
Hysterektomie wegen Gebärmuttermyomen und R-Lungenresektion wegen Karzinoidtumor
in der chirurgischen Sprechstunde wegen Bauchschmerzen, Übelkeit und
Erbrechen. Der Patientin ging es bis zum frühen Morgen gut
um etwa 1:00 Uhr morgens, als sie krampfartige Unterleibsschmerzen
Bauchschmerzen in Verbindung mit Übelkeit und galligem Erbrechen ohne Blut.  
Sie
übergab sich etwa ___ Mal, woraufhin sie sich
in der Notaufnahme.  Zum Zeitpunkt des Erbrechens hatte sie Durchfall und
hatte sie Durchfall und bewegte ihren Darm > 3 Mal.  Sie hatte noch nie diese oder ähnliche
Schmerzen gehabt, und sie gibt an, dass sie noch nie zuvor einen
Dünndarmverschluss hatte.  Sie hatte noch nie eine Darmspiegelung.

 

 

 
Medizinische Vorgeschichte:
PMH:
Karzinoid-Tumor wie oben
Vitamin-B12-Mangel
Depression
Hyperlipidämie

PSH:
s/p R Lungenresektion in ___ bei ___
s/p Hysterektomie in ___
s/p R Armoperation

 
Soziale Vorgeschichte:
___
Familienanamnese:
nicht beitragspflichtig
 
Körperliche Untersuchung:
Temperatur 96,9 HR 105 Blutdruck 108/92 100%RA
NAD, scheint nicht toxisch, aber unangenehm
Herz tachykard, aber regelmäßig, keine Herzgeräusche wahrnehmbar
Lunge bei der Auskultation klar; verminderte Atemgeräusche im R;
gut verheilte R-Thorakotomienarbe vorhanden
Abdomen weich, sehr fettleibig, minimal gebläht, etwas schmerzhaft
auf
Palpation diffus im gesamten Abdomen; kein Guarding; kein Rebound
Zärtlichkeit, niedrige Mittellinie der Bauchwunde c/d/i, keine Drainage, kein
Erythem

 
Relevante Ergebnisse:
___ 04:40 UHR WBC-12,5*# RBC-4,46 HGB-13,6 HCT-39,7 MCV-89
MCH-30,5 MCHC-34,2 RDW-13,0
___ 04:40 UHR NEUTS-91.1* LYMPHS-7.4* MONOS-0.8* EOS-0.3
BASOS-0.2
04:40 UHR PLÄTTCHENZAHL-329
04:40 UHR GLUKOSE-151* HARNSTOFF-N-10 KREAT-0,8 NATRIUM-142
KALIUM-3,8 CHLORID-105 GESAMT-CO2-28 ANIONENLÜCKE-13
___ 04:40 UHR ALT(SGPT)-12 AST(SGOT)-16 LD(LDH)-180 ALK
PHOS-62

CT des Abdomens und des Beckens: 1. leicht erweiterte Dünndarmschlingen
Dünndarmschlingen mit Fäkalisierung des Dünndarminhalts und distalen
kollabierten Dünndarmschlingen, was auf eine frühe vollständige oder partielle
Dünndarmobstruktion.
2. Postoperative Veränderungen an den rechten Rippen, wie oben beschrieben.
oben beschrieben.

CT des Abdomens und des Beckens:
1. Intervallweise Verschlimmerung der Dünndarmobstruktion. Übergang
Punkt in der
linken Mittelbauch. (Der Patient ging am Abend der Studie in den OP)
der Studie).
2. Freie Flüssigkeitsspuren im Becken sind wahrscheinlich physiologisch.  

  

10:57 Uhr URIN FARBE-GELB ERSCHEINEN-Hazy SP ___
22:57 UHR URIN BLUT-LG NITRIT-NEG PROTEIN-TR
GLUKOSE-NEG KETON-15 BILIRUBIN-NEG UROBILNGN-NEG PH-6.5
LEUK-NEG
22:57 UHR URIN RBC->50 ___ BAKTERIEN-MOD HEFE-KEINE
EPI-0
22:57 UHR URIN SCHLEIMIG-OKK
04:40 UHR GLUKOSE-151* HARNSTOFF-N-10 CREAT-0.8 NATRIUM-142
KALIUM-3,8 CHLORID-105 GESAMT-CO2-28 ANIONENLÜCKE-13
04:40 Uhr estGFR-Verwendung
04:40 UHR ALT(SGPT)-12 AST(SGOT)-16 LD(LDH)-180 ALK
PHOS-62 TOT BILI-0.2
04:40 UHR LIPASE-17
___ 04:40 UHR WBC-12,5*# RBC-4,46 HGB-13,6 HCT-39,7 MCV-89
MCH-30,5 MCHC-34,2 RDW-13,0
___ 04:40 UHR NEUTS-91.1* LYMPHS-7.4* MONOS-0.8* EOS-0.3
BASOS-0.2
04:40 UHR BLUTPLÄTTCHENZAHL-329
 
Kurzer Krankenhausaufenthalt:
Diese ___ Jahre alte Frau wurde ins Krankenhaus eingeliefert und wurde
Sie wurde nüchtern eingeliefert, bekam Infusionen und eine nasogastrische Sonde
gelegt.  Bei einer Temperatur von 101 wurde eine Pan-Kultur angelegt.
serielle KUBs und eine körperliche Untersuchung durchgeführt. Ihr nasogastraler
wurde am 2. Krankenhaustag abgeklemmt, und sie entwickelte bald
zunehmende Bauchschmerzen, die eine erneute CT des Abdomens und
Beckens veranlasste.  Dabei zeigte sich eine Zunahme des Grades der
Obstruktion und wurde daraufhin in den Operationssaal gebracht
für den oben erwähnten Eingriff gebracht.

Sie vertrug den Eingriff gut, blieb nüchtern mit nasogastraler
nasogastraler Sonde und wurde mit intravenöser Flüssigkeit behandelt.  Ihre Schmerzen wurden
anfänglich mit einer Morphin-PCA kontrolliert.  Ihr nasogastraler Schlauch
wurde am 2. postoperativen Tag entfernt und sie begann mit einer klaren Flüssigdiät
die sie gut vertrug.  Diese wurde schrittweise über 36
Stunden zu einer normalen Diät, die gut vertragen wurde.  Sie hatte
Stuhlgang und vertrug orale Schmerzmittel.  Ihr
Inzision heilte gut und die Klammern waren intakt.  Nach einem
unkomplizierten Verlauf wurde sie am ___ nach Hause entlassen.
 
Medikamente bei Aufnahme:
Albuteral MDI prn wheezes
Flovent Inhalator prn Keuchen
Srtralin 200 mg oral täglich
Simvastatin 20 mg oral täglich
Trazadon 100 mg oral täglich vor dem Schlafengehen
Wellbutrin 75 mg oral zweimal täglich
 
Entlassungsmedikamente:
1. Albuterol Sulfat 90 mcg/Aktuation HFA Aerosol Inhalator Sig:
Zwei (2) Puff Inhalation Q6H (alle 6 Stunden) nach Bedarf für
Keuchen, Kurzatmigkeit.  
2. Fluticason 110 mcg/Aktuation Aerosol Sig: Zwei (2) Züge
Inhalation BID (2 mal täglich).  
3. Oxycodon-Acetaminophen ___ mg Tablette Sig: ___ Tabletten PO
Q4H (alle 4 Stunden) je nach Bedarf bei Schmerzen.
Abgabe:*40 Tablette(n)* Nachfüllpackungen:*0*
4. Docusat-Natrium 100 mg Kapsel Sig: Eine (1) Kapsel PO BID (2
mal pro Tag).
Abgabe:*60 Kapsel(n)* Nachfüllpackungen:*2*
5. Simvastatin 20 mg Tablette Sig: Eine (1) Tablette PO einmal täglich.
Abgabe:*30 Tablette(n)* Nachfüllpackungen:*2*
6. Trazodon 100 mg Tablette Sig: Eine (1) Tablette PO vor dem Schlafengehen.  
7. Wellbutrin 75 mg Tablette Sig: Eine (1) Tablette PO zweimal pro Tag.  

 
Verabreichung bei der Entlassung:
Zuhause
 
Entlassungsdiagnose:
Hochgradige Dünndarmobstruktion

 
Zustand bei der Entlassung:
Henodynamisch stabil, toleriert eine regelmäßige Diät, hat Stuhlgang
Stuhlgang, ausreichende Schmerzkontrolle

 
Anweisungen für die Entlassung:
Bitte rufen Sie Ihren Arzt oder Ihre Krankenschwester an oder kommen Sie in die
Notaufnahme, wenn Sie eines der folgenden Probleme haben:

*Sie haben neue Schmerzen, Druck, Quetschung oder Enge in der Brust.
Engegefühl.

*Neuer oder sich verschlimmernder Husten, Kurzatmigkeit oder Keuchen.

* Wenn Sie erbrechen und weder Flüssigkeit noch Ihre Medikamente bei sich behalten können
Medikamente.

*Wenn Sie aufgrund von anhaltendem Erbrechen, Durchfall oder aus anderen Gründen dehydriert sind,
oder aus anderen Gründen. Anzeichen für Dehydrierung sind ein trockener Mund, ein schneller
Herzschlag, Schwindelgefühl oder Ohnmacht beim Stehen.

*Sie sehen Blut oder dunkles/schwarzes Material, wenn Sie erbrechen oder Stuhlgang haben.
Stuhlgang haben.

*Sie haben Brennen beim Urinieren, Blut im Urin oder Ausfluss.
Blut im Urin oder einen Ausfluss.

*Ihre Schmerzen bessern sich nicht innerhalb von ___ Stunden oder sind nicht
innerhalb von 24 Stunden. Rufen Sie sofort an oder kommen Sie zurück, wenn Ihre Schmerzen
sich verschlimmern, den Ort wechseln oder in die Brust oder den
Rücken.

*Sie haben Schüttelfrost oder Fieber von mehr als 101,5 Grad
Fahrenheit oder 38 Grad Celsius.

*Jede Veränderung Ihrer Symptome oder jedes neue Symptom, das Sie beunruhigt.
Sie beunruhigen.

Bitte nehmen Sie alle regelmäßig eingenommenen Medikamente wieder ein, es sei denn
es sei denn, es wird Ihnen ausdrücklich empfohlen, ein bestimmtes Medikament nicht einzunehmen. Bitte nehmen Sie auch
neue Medikamente wie verordnet ein.

Bitte ruhen Sie sich ausreichend aus, bewegen Sie sich weiterhin mehrmals am Tag
täglich und trinken Sie ausreichend Flüssigkeit. Vermeiden Sie das Heben von
Vermeiden Sie das Heben von Gewichten über ___ lbs, bis Sie sich mit Ihrem
Chirurgen.

Vermeiden Sie es, während der Einnahme von Schmerzmitteln Auto zu fahren oder schwere Maschinen zu bedienen.
Medikamenten.

Pflege der Inzision:

*Bitte rufen Sie Ihren Arzt oder Ihre Krankenschwester an, wenn Sie
Schmerzen, Schwellungen, Rötungen oder Ausfluss an der Einschnittstelle
Stelle.

*Vermeiden Sie Schwimmen und Baden bis zu Ihrem Nachsorgetermin.

*Sie können duschen und die Einschnitte mit einer milden Seife und warmem Wasser waschen.
und warmem Wasser waschen. Tupfen Sie den Bereich sanft trocken.

*Wenn Sie Klammern haben, werden diese bei Ihrem Nachsorgetermin entfernt.
Termin entfernt.

*Wenn Sie Steri-Strips haben, fallen diese von selbst ab.
Bitte entfernen Sie alle verbleibenden Streifen ___ Tage nach der Operation.

*Bitte kontrollieren Sie die Stelle täglich auf Anzeichen einer Infektion
(verstärkte Rötung oder Schmerzen, Schwellung, Geruch, gelb oder blutig

 
Anweisungen zur Nachsorge:
___
`;
