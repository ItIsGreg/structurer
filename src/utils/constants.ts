import { EntityAttributes, OptionType, Outline, SectionInfo } from "../types";

export const isProd = () => {
  return process.env.NEXT_PUBLIC_ENV === "prod";
  // return true;
};

export const awsUrl = isProd()
  ? process.env.NEXT_PUBLIC_AWS_URL
  : "http://localhost:8000";

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
  { value: "gpt-3.5-turbo", label: "gpt-3.5-turbo" },
  { value: "gpt-3.5-turbo-1106", label: "gpt-3.5-turbo-1106" },
  { value: "gpt-4", label: "gpt-4" },
  { value: "gpt-4-1106-preview", label: "gpt-4-1106-preview" },
];

export const defaultGPTModel = "gpt-3.5-turbo-1106";

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
    askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section1",
    startIndex: 2,
    endIndex: 100,
    askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section3",
    startIndex: 3,
    endIndex: 100,
    askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section4",
    startIndex: 4,
    endIndex: 100,
    askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section5",
    startIndex: 5,
    endIndex: 100,
    askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section6",
    startIndex: 6,
    endIndex: 100,
    askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section7",
    startIndex: 7,
    endIndex: 100,
    askedFor: true,
    text: generateDummyTextWithNewlines(),
  },
  {
    key: "Section8",
    startIndex: 8,
    endIndex: 100,
    askedFor: true,
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
