export const DRUG_DATA: Record<string, {
  details: string;
  symptoms: string[];
  medication: string;
  reduction: string;
  avoidance: string;
  feeling: string;
  drivers: string;
  mentalEffects: string;
  physicalEffects: string;
}> = {
  "Alcohol": {
    details: "A central nervous system depressant that slows down brain function and physical activity.",
    symptoms: ["Slurred speech", "Drowsiness", "Vomiting", "Upset stomach", "Distorted vision/hearing"],
    medication: "Naltrexone, Acamprosate, and Disulfiram are commonly prescribed to manage dependence.",
    reduction: "Set limits, have drink-free days, and avoid keeping alcohol at home.",
    avoidance: "Identify triggers, build a support network, and find non-alcoholic alternatives.",
    feeling: "Initial euphoria or relaxation followed by depression, anxiety, and impaired judgment.",
    drivers: "Social pressure, stress relief, emotional numbing, or genetic predisposition.",
    mentalEffects: "Memory loss, increased aggression, severe depression, and cognitive decline.",
    physicalEffects: "Liver cirrhosis, heart disease, stroke, and increased cancer risk."
  },
  "Nicotine": {
    details: "A highly addictive stimulant found in tobacco products and e-cigarettes.",
    symptoms: ["Increased heart rate", "Coughing", "Dizziness", "Headaches", "Nausea"],
    medication: "Nicotine Replacement Therapy (NRT), Varenicline (Chantix), and Bupropion.",
    reduction: "Delay the first cigarette of the day, use patches, or switch to nicotine-free vaping.",
    avoidance: "Avoid social smoking circles and high-stress situations that trigger the urge.",
    feeling: "A short-lived buzz or 'hit' followed by irritability and craving when levels drop.",
    drivers: "Habit, stress management, weight control, or peer influence.",
    mentalEffects: "Increased anxiety, dependency, and difficulty concentrating without a dose.",
    physicalEffects: "Lung cancer, heart disease, respiratory failure, and premature aging."
  },
  "Cannabis": {
    details: "A psychoactive drug containing THC that affects mood, perception, and memory.",
    symptoms: ["Red eyes", "Increased appetite", "Slowed reaction time", "Paranoia", "Dry mouth"],
    medication: "There are no FDA-approved medications specifically for cannabis use disorder, but therapy is effective.",
    reduction: "Gradually decrease frequency and potency of use.",
    avoidance: "Clean your environment of paraphernalia and find new hobbies to fill time.",
    feeling: "Relaxation or 'high', but often accompanied by lethargy and social anxiety.",
    drivers: "Boredom, creative enhancement, sleep aid, or 'self-medicating' anxiety.",
    mentalEffects: "Impaired short-term memory, lack of motivation (amotivational syndrome), and potential psychosis.",
    physicalEffects: "Lung irritation, increased heart rate, and potential reproductive issues."
  },
  "Cocaine": {
    details: "A powerful stimulant that increases dopamine levels in the brain's reward circuit.",
    symptoms: ["Hyper-activity", "Dilated pupils", "Runny or bloody nose", "Restlessness", "Paranoia"],
    medication: "No specific FDA-approved medication; behavioral therapies (CBT) are the gold standard.",
    reduction: "Impossible to 'moderate'; full cessation is required due to high addictive potential.",
    avoidance: "Cut off all supply contacts and avoid environments where it is prevalent.",
    feeling: "Intense euphoria, energy, and confidence followed by a devastating 'crash'.",
    drivers: "Chasing the high, seeking extreme confidence, or staying awake in social scenes.",
    mentalEffects: "Severe paranoia, hallucinations, depression, and permanent dopaminergic damage.",
    physicalEffects: "Heart attacks, respiratory failure, seizures, and nasal septum destruction."
  },
  "Opioids": {
    details: "A class of drugs including heroin, fentanyl, and prescription pain relievers.",
    symptoms: ["Pinpoint pupils", "Nodding off", "Constipation", "Slowed breathing", "Nausea"],
    medication: "Methadone, Buprenorphine, and Naltrexone save lives by managing withdrawal.",
    reduction: "Must be done under medical supervision due to life-threatening withdrawal risks.",
    avoidance: "Strict adherence to prescription guidelines and immediate disposal of unused pills.",
    feeling: "Intense pain relief and euphoria followed by extreme physical dependency.",
    drivers: "Chronic pain management or escaping deep emotional trauma.",
    mentalEffects: "Confusion, depression, and complete restructuring of the brain's reward system.",
    physicalEffects: "Fatal overdose, collapsed veins, heart infections, and liver disease."
  },
  "Methamphetamine": {
    details: "An extremely potent and addictive stimulant that affects the central nervous system.",
    symptoms: ["Increased wakefulness", "Decreased appetite", "Rapid heart rate", "Hyperthermia", "Dental problems ('meth mouth')"],
    medication: "No FDA-approved medications; behavioral therapies like the Matrix Model are used.",
    reduction: "Highly difficult due to intense psychological dependence; requires structured detox.",
    avoidance: "Distance yourself from the drug subculture and seek long-term residential treatment.",
    feeling: "Immediate intense rush or 'flash' followed by prolonged euphoria and high energy.",
    drivers: "Seeking extreme productivity, weight loss, or an escape from severe depression.",
    mentalEffects: "Chronic anxiety, insomnia, paranoia, hallucinations, and violent behavior.",
    physicalEffects: "Extreme weight loss, severe dental issues, skin sores, and permanent brain damage."
  },
  "MDMA": {
    details: "A synthetic drug that acts as both a stimulant and a hallucinogen, often called Ecstasy or Molly.",
    symptoms: ["Increased heart rate", "Muscle tension", "Involuntary teeth clenching", "Nausea", "Blurred vision"],
    medication: "No specific medication; treatment focuses on behavioral therapy and addressing co-occurring issues.",
    reduction: "Monitor frequency and setting; total abstinence is recommended to allow serotonin recovery.",
    avoidance: "Avoid 'rave' culture or social scenes where use is normalized.",
    feeling: "Increased energy, pleasure, emotional warmth, and distorted sensory perception.",
    drivers: "Social connection, sensory enhancement, or seeking 'oneness' in dance environments.",
    mentalEffects: "Severe serotonin depletion leading to major depression, memory loss, and confusion.",
    physicalEffects: "Kidney failure, dangerous increase in body temperature, and heart rhythm problems."
  },
  "LSD": {
    details: "A powerful hallucinogenic drug that significantly distorts perceptions of reality.",
    symptoms: ["Dilated pupils", "Sweating", "Loss of appetite", "Sleeplessness", "Dry mouth"],
    medication: "No specific medication; psychological support is provided during 'bad trips'.",
    reduction: "Tolerance builds rapidly; use usually tapers off naturally but can lead to HPPD.",
    avoidance: "Identify psychological triggers and avoid environments that encourage detachment.",
    feeling: "Intense sensory distortion, 'ego death', and profound changes in consciousness.",
    drivers: "Spiritual seeking, curiosity, or a desire for radical perspective shifts.",
    mentalEffects: "Flashbacks (HPPD), potential for drug-induced psychosis, and severe anxiety.",
    physicalEffects: "Increased heart rate, tremors, and potential accidents due to disorientation."
  },
  "Benzodiazepines": {
    details: "Sedative-hypnotic drugs used to treat anxiety and insomnia, but highly addictive.",
    symptoms: ["Drowsiness", "Dizziness", "Poor coordination", "Slurred speech", "Confusion"],
    medication: "Tapering programs under medical supervision; Flumazenil is used for acute overdose.",
    reduction: "MUST be tapered slowly; abrupt cessation can cause fatal seizures.",
    avoidance: "Use only as prescribed for short durations; find non-pharmacological anxiety aids.",
    feeling: "Profound relaxation, sedation, and a 'numbing' of all emotional distress.",
    drivers: "Anxiety management, sleep problems, or 'coming down' from stimulants.",
    mentalEffects: "Memory impairment, emotional blunting, and severe rebound anxiety.",
    physicalEffects: "Extreme respiratory depression when mixed with alcohol; physical dependence."
  },
  "Ketamine": {
    details: "A dissociative anesthetic with hallucinogenic effects, sometimes used for treatment-resistant depression.",
    symptoms: ["Immobilization", "Distorted sight and sound", "Numbness", "Hallucinations", "Confusion"],
    medication: "Behavioral therapy; there are no specific pharmacological treatments for dependence.",
    reduction: "Address the dissociative urge through talk therapy and lifestyle changes.",
    avoidance: "Stay away from social settings where it's used as a 'party drug'.",
    feeling: "Detachment from the body (the 'K-hole'), tranquility, and altered perception.",
    drivers: "Seeking a sense of detachment from reality or emotional pain.",
    mentalEffects: "Severe cognitive impairment, amnesia, and potential for chronic psychosis.",
    physicalEffects: "Bladder damage (Ketamine Cystitis), high blood pressure, and respiratory issues."
  },
  "Heroin": {
    details: "An illegal opioid drug processed from morphine, known for its rapid and intense high.",
    symptoms: ["Shortness of breath", "Dry mouth", "Constricted pupils", "Sudden changes in behavior", "Disorientation"],
    medication: "Methadone, Buprenorphine, and Suboxone; Naloxone is used to reverse overdose.",
    reduction: "Medically assisted detox is essential to handle the severe withdrawal phase.",
    avoidance: "Complete removal from use environments; involvement in long-term support groups.",
    feeling: "Initial 'rush' of euphoria followed by a warm, heavy sensation and clouded mental state.",
    drivers: "Relief from physical or emotional pain; chasing the initial intense high.",
    mentalEffects: "Long-term changes in brain structure, impacting decision-making and stress response.",
    physicalEffects: "Infectious diseases (HIV/Hepatitis), collapsed veins, and heart valve infections."
  },
  "Fentanyl": {
    details: "A synthetic opioid that is 50-100 times more potent than morphine.",
    symptoms: ["Extreme drowsiness", "Nausea", "Confusion", "Constipation", "Respiratory arrest"],
    medication: "Same as other opioids; requires higher/multiple doses of Naloxone for overdose reversal.",
    reduction: "Extremely high overdose risk makes medical supervision a non-negotiable requirement.",
    avoidance: "Never use drugs from non-pharmaceutical sources; use Fentanyl test strips.",
    feeling: "Intense, rapid pain relief and sedation; easily crosses the blood-brain barrier.",
    drivers: "High-level pain management or unintentional use via contaminated drug supplies.",
    mentalEffects: "Severe risk of fatal overdose and rapid development of extreme dependency.",
    physicalEffects: "Instant respiratory failure and death; severe physical addiction."
  },
  "Psilocybin": {
    details: "Naturally occurring psychedelic compounds produced by more than 200 species of mushrooms.",
    symptoms: ["Nausea", "Yawning", "Increased heart rate", "Muscle relaxation", "Dilated pupils"],
    medication: "No specific medication; use supportive care for psychological distress.",
    reduction: "Usually self-limiting due to rapid tolerance building.",
    avoidance: "Avoid environments where hallucinogen use is encouraged; focus on grounding exercises.",
    feeling: "Altered states of consciousness, auditory and visual hallucinations, and spiritual experiences.",
    drivers: "Introspection, spiritual seeking, or recreational sensory change.",
    mentalEffects: "Risk of 'flashbacks', triggering underlying mental health conditions like schizophrenia.",
    physicalEffects: "Gastrointestinal distress and potential for accidental poisoning from misidentified wild mushrooms."
  },
  "Inhalants": {
    details: "Volatile substances that produce chemical vapors that can be inhaled to induce a psychoactive effect.",
    symptoms: ["Slurred speech", "Lack of coordination", "Dizziness", "Euphoria", "Lightheadedness"],
    medication: "Treatment focuses on behavioral therapy and neurological assessment.",
    reduction: "Immediate cessation is vital; find alternative sensory stimulation.",
    avoidance: "Store household chemicals securely and avoid hardware/hobby shops where precursors are sold.",
    feeling: "Brief, intense high followed by disorientation, slurred speech, and loss of consciousness.",
    drivers: "Easy accessibility and low cost, often used by younger adolescents.",
    mentalEffects: "Major cognitive impairment, memory loss, and loss of intelligence.",
    physicalEffects: "Sudden Sniffing Death Syndrome (SSDS), permanent damage to brain, liver, and kidneys."
  },
  "Bath Salts": {
    details: "Synthetic cathinones that are chemically related to the stimulant found in the khat plant.",
    symptoms: ["Extreme agitation", "Paranoia", "Hallucinations", "Chest pain", "Increased heart rate"],
    medication: "Benzodiazepines for agitation; intensive behavioral therapy for long-term recovery.",
    reduction: "Full cessation is required; these substances are notoriously unpredictable and dangerous.",
    avoidance: "Avoid 'head shops' or gas stations that sell 'research chemicals' or 'plant food'.",
    feeling: "Intense stimulant effects resembling both cocaine and MDMA, but much more aggressive.",
    drivers: "Seeking a cheap, powerful stimulant high; often used when other drugs aren't available.",
    mentalEffects: "Long-term psychosis, suicidal ideation, and extreme violent behavior.",
    physicalEffects: "Dehydration, breakdown of skeletal muscle tissue, and kidney failure."
  },
  "GHB": {
    details: "Gamma-hydroxybutyrate is a depressant often used as an intoxicant or a 'date rape' drug.",
    symptoms: ["Nausea", "Drowsiness", "Visual distortions", "Unconsciousness", "Slowed heart rate"],
    medication: "Detoxification under medical supervision; Baclofen is sometimes used for withdrawal.",
    reduction: "Extremely dangerous withdrawal; requires immediate medical consultation if dependent.",
    avoidance: "Never leave drinks unattended; be wary of clear, salty liquids offered in social settings.",
    feeling: "Euphoria and increased sex drive at low doses; rapid transition to sedation and amnesia.",
    drivers: "Seeking social facilitation, enhanced libido, or sadly, used for predatory purposes.",
    mentalEffects: "Confusion, depression, and significant loss of motor control.",
    physicalEffects: "Fatal respiratory depression, seizures, and deep coma."
  },
  "Adderall Misuse": {
    details: "Misuse of prescription amphetamine medications originally intended for ADHD treatment.",
    symptoms: ["Insomnia", "Loss of appetite", "Irritability", "Dry mouth", "Anxiety"],
    medication: "Gradual tapering under medical supervision; behavioral therapy for habit reversal.",
    reduction: "Follow strict prescribing instructions; avoid 'all-nighter' study cycles.",
    avoidance: "Build better organizational and study habits; never share or sell prescriptions.",
    feeling: "Intense focus, alertness, and temporary cognitive enhancement followed by a major crash.",
    drivers: "Academic or professional performance pressure; 'smart drug' myths.",
    mentalEffects: "Stimulant-induced psychosis, chronic anxiety, and severe sleep disorders.",
    physicalEffects: "Heart problems, high blood pressure, and potential stroke."
  },
  "Khat": {
    details: "A stimulant plant native to the Horn of Africa and the Arabian Peninsula.",
    symptoms: ["Euphoria", "Alertness", "Loss of appetite", "Constipation", "Insomnia"],
    medication: "Counseling and behavior adjustment therapy.",
    reduction: "Replace the social aspect of 'chewing' with other community activities.",
    avoidance: "Avoid social circles where daily khat use is the primary cultural activity.",
    feeling: "Moderate stimulation, talkativeness, and suppressed appetite.",
    drivers: "Cultural tradition and social bonding in specific ethnic communities.",
    mentalEffects: "Depression, irritability, and potential for psychosis with chronic use.",
    physicalEffects: "Mouth cancers, gum disease, and cardiovascular problems."
  },
  "Synthetic Cannabinoids": {
    details: "Man-made mind-altering chemicals that are either sprayed on dried plant material (Spice/K2) or vaped.",
    symptoms: ["Rapid heart rate", "Vomiting", "Violent behavior", "Suicidal thoughts", "Seizures"],
    medication: "Symptomatic treatment in ER; intensive long-term drug counseling.",
    reduction: "Total avoidance is critical; these chemicals have no 'safe' dose.",
    avoidance: "Educate on the extreme danger of 'legal highs'; avoid unregulated vaping products.",
    feeling: "Intense, often terrifying alterations in perception; much more potent than natural cannabis.",
    drivers: "Seeking a 'legal' high or attempting to hide drug use from standard drug tests.",
    mentalEffects: "Severe paranoia, long-lasting psychosis, and extreme agitation.",
    physicalEffects: "Kidney damage, seizures, and heart attacks."
  },
  "Kratom": {
    details: "A tropical tree native to Southeast Asia, with leaves that contain compounds with psychotropic effects.",
    symptoms: ["Nausea", "Sweating", "Chills", "Loss of appetite", "Itching"],
    medication: "No specific medication; behavioral therapy is the primary treatment.",
    reduction: "Taper down usage under guidance; it can cause opioid-like withdrawal.",
    avoidance: "Avoid 'herbal' or 'natural' marketing that downplays the risk of addiction.",
    feeling: "Stimulant effects in small doses; opioid-like sedative effects in larger doses.",
    drivers: "Pain management, energy boost, or as a self-treatment for opioid withdrawal.",
    mentalEffects: "Hallucinations, delusion, and significant addiction potential.",
    physicalEffects: "Liver toxicity, seizures, and respiratory depression in rare cases."
  },
  "Salvia": {
    details: "An herb in the mint family native to southern Mexico, known for causing short-lived but intense hallucinations.",
    symptoms: ["Visual hallucinations", "Uncontrolled laughter", "Impaired motor control", "Dizziness", "Slurred speech"],
    medication: "Supportive psychological care during and after the experience.",
    reduction: "Use is typically infrequent due to the terrifying nature of many 'trips'.",
    avoidance: "Identify the curiosity that leads to its use and channel it into safer activities.",
    feeling: "Profound, often disturbing detachment from reality; 'merging' with objects.",
    drivers: "Seeking radical, short-duration alterations in consciousness.",
    mentalEffects: "Acute anxiety, panic, and potential for long-term psychological trauma.",
    physicalEffects: "Chills, nausea, and loss of physical coordination."
  },
  "DMT": {
    details: "Dimethyltryptamine is a powerful psychedelic chemical found in many plants and animals.",
    symptoms: ["Rapid heart rate", "Increased blood pressure", "Dilated pupils", "Visual distortions", "Nausea"],
    medication: "No specific medication; psychological counseling for integration of experiences.",
    reduction: "Typically used very infrequently; focus on addressing the 'escapist' motivation.",
    avoidance: "Avoid communities that treat it as a 'rite of passage' without medical oversight.",
    feeling: "Intense, reality-shattering hallucinations; often described as entering another dimension.",
    drivers: "Spiritual exploration and seeking 'the truth' about meta-reality.",
    mentalEffects: "Potential for HPPD, severe confusion, and existential crisis.",
    physicalEffects: "Serotonin syndrome risk if mixed with MAOIs; cardiovascular stress."
  },
  "PCP": {
    details: "Phencyclidine is a dissociative drug formerly used as an anesthetic, now strictly an illegal street drug.",
    symptoms: ["Numbness", "Slurred speech", "Loss of coordination", "Staring into space", "Rapid eye movement"],
    medication: "Safe, low-stimulus environment; benzodiazepines or antipsychotics for acute aggression.",
    reduction: "Professional addiction treatment is mandatory; it is highly volatile and dangerous.",
    avoidance: "Strict avoidance of all unregulated 'wet' substances (often cigarettes dipped in PCP).",
    feeling: "Detachment from surroundings and self; distorted strength and invulnerability.",
    drivers: "Escaping extreme social or personal reality; distorted sense of power.",
    mentalEffects: "Extreme violence, suicidal ideation, and long-term cognitive loss.",
    physicalEffects: "Seizures, respiratory failure, and severe hyperthermia."
  },
  "Anabolic Steroids": {
    details: "Synthetic variations of the male sex hormone testosterone, used to build muscle.",
    symptoms: ["Severe acne", "Hair loss", "Shriving of testicles", "Breast development in men", "Irritability"],
    medication: "Endocrine therapy to restore natural hormone balance; behavioral therapy.",
    reduction: "Must be tapered to avoid severe depression and hormonal collapse.",
    avoidance: "Challenge the societal pressure for 'perfect' body shapes; focus on healthy fitness.",
    feeling: "Increased muscle mass, strength, and confidence, but often masked by 'roid rage'.",
    drivers: "Body image issues (Bigorexia), athletic performance, or aesthetic goals.",
    mentalEffects: "Aggression, paranoia, delusions of grandeur, and severe depression upon quitting.",
    physicalEffects: "Heart attacks, liver cancer, stunted growth in teens, and infertility."
  },
  "DXM": {
    details: "Dextromethorphan is a cough suppressant found in OTC medicines, misused in high doses for dissociative effects.",
    symptoms: ["Confusion", "Slurred speech", "Numbness", "Itching", "Increased heart rate"],
    medication: "Supportive care in ER; behavioral treatment for substance use disorder.",
    reduction: "Limit access to OTC medicines; monitor cabinets in homes.",
    avoidance: "Education on the 'dirty' high and severe risks of liver damage from additives like acetaminophen.",
    feeling: "Euphoria and mild hallucinations at low doses; full dissociation at high doses.",
    drivers: "Easy access, perceived 'safety' of OTC products, and low cost.",
    mentalEffects: "Memory loss, learning disabilities with chronic use, and panic attacks.",
    physicalEffects: "Liver damage (from acetaminophen in cough syrups), brain damage, and seizures."
  },
  "Mescaline": {
    details: "A naturally occurring psychedelic alkaloid found in the Peyote cactus and San Pedro cactus.",
    symptoms: ["Nausea", "Vomiting", "Sweating", "Increased heart rate", "Dilated pupils"],
    medication: "Supportive psychological care; no FDA-approved medications.",
    reduction: "Use is rare and often ceremonial; focus on the underlying spiritual search.",
    avoidance: "Respect cultural traditions while recognizing the psychological risks involved.",
    feeling: "Visual hallucinations, altered sense of time, and deep intense introspection.",
    drivers: "Spiritual tradition, curiosity, and seeking 'ego dissolution'.",
    mentalEffects: "Acute anxiety, panic, and potential for HPPD.",
    physicalEffects: "Severe gastrointestinal distress and elevated blood pressure."
  },
  "Ayahuasca": {
    details: "An entheogenic brew made out of the Banisteriopsis caapi vine and other ingredients.",
    symptoms: ["Severe vomiting", "Diarrhea", "Visual hallucinations", "Auditory distortions", "Panic"],
    medication: "Supportive care; no specific pharmacological treatment.",
    reduction: "Generally not addictive; focus on grounding after the experience.",
    avoidance: "Avoid unregulated 'ceremonies' led by unqualified individuals.",
    feeling: "Intense, long-lasting psychedelic experience often described as 'purging'.",
    drivers: "Spiritual healing, trauma processing, or deep introspection.",
    mentalEffects: "Potential for long-term psychological distress or triggering psychosis.",
    physicalEffects: "Dangerous interactions with SSRIs (Serotonin Syndrome) and high blood pressure."
  },
  "Tramadol": {
    details: "A synthetic opioid analgesic used to treat moderate to severe pain.",
    symptoms: ["Dizziness", "Headache", "Drowsiness", "Nausea", "Constipation"],
    medication: "Same as other opioids; risk of seizures makes medical supervision critical.",
    reduction: "Must be tapered; abrupt cessation can cause SSRI-like withdrawal symptoms.",
    avoidance: "Strictly adhere to dosage; never mix with other depressants.",
    feeling: "Pain relief, mild euphoria, and sedation.",
    drivers: "Managing chronic pain; often perceived as a 'safer' opioid.",
    mentalEffects: "Dependency, confusion, and risk of serotonin-related issues.",
    physicalEffects: "Seizures, respiratory depression, and addiction."
  },
  "Barbiturates": {
    details: "Central nervous system depressants used to treat seizures and anxiety, mostly replaced by benzodiazepines.",
    symptoms: ["Confusion", "Irritability", "Slurred speech", "Staggering", "Drowsiness"],
    medication: "Slow, medically-monitored taper is essential; abrupt withdrawal can be fatal.",
    reduction: "Extremely difficult due to severe physical dependence.",
    avoidance: "Avoid old prescriptions; find safer alternatives for sleep/anxiety.",
    feeling: "Broad range from mild sedation to total anesthesia; numbs all senses.",
    drivers: "Sleep disorders, severe anxiety, or seeking a heavy 'downer' high.",
    mentalEffects: "Significant memory loss, emotional instability, and chronic confusion.",
    physicalEffects: "Extremely high risk of fatal overdose; organ failure."
  },
  "Nitrous Oxide": {
    details: "A colorless gas used for sedation and pain relief, commonly known as 'laughing gas'.",
    symptoms: ["Giggling", "Dizziness", "Distorted sound", "Tingling in limbs", "Slight hallucinations"],
    medication: "B12 supplementation for chronic users; withdrawal is mostly psychological.",
    reduction: "Address the psychological need for short-term 'escapes'.",
    avoidance: "Avoid 'whippets' or culinary gas chargers used for non-culinary purposes.",
    feeling: "Brief, intense euphoria, floating sensation, and dissociation.",
    drivers: "Low cost, easy availability, and short duration of effects.",
    mentalEffects: "Confusion, loss of consciousness, and psychological dependency.",
    physicalEffects: "Vitamin B12 deficiency (nerve damage), oxygen deprivation, and frostbite."
  },
  "Datura": {
    details: "A genus of nine species of highly poisonous vespertine flowering plants.",
    symptoms: ["Extreme thirst", "Dilated pupils", "Blurred vision", "Fast heart rate", "Delirium"],
    medication: "Requires immediate hospitalization; Physostigmine for severe toxicity.",
    reduction: "Total avoidance; it is one of the most dangerous hallucinogens known.",
    avoidance: "Educate on the lethal nature of the plant; remove from gardens.",
    feeling: "Absolute delirium (unable to distinguish hallucination from reality) lasting days.",
    drivers: "Dangerous curiosity or lack of awareness of its high toxicity.",
    mentalEffects: "Long-term cognitive impairment, persistent psychosis, and amnesia.",
    physicalEffects: "Fatal poisoning, cardiac arrest, and total organ failure."
  },
  "Caffeine": {
    details: "A central nervous system stimulant of the methylxanthine class.",
    symptoms: ["Jitteriness", "Insomnia", "Headaches", "Rapid heart rate", "Anxiety"],
    medication: "Gradual reduction in intake to avoid withdrawal headaches.",
    reduction: "Switch to decaf or tea; track daily mg consumption.",
    avoidance: "Set a 'cutoff time' in the early afternoon; prioritize natural sleep.",
    feeling: "Alertness, focus, and temporary energy boost.",
    drivers: "Work/study culture, fatigue management, and social habit.",
    mentalEffects: "Increased anxiety, sleep disturbances, and physical dependency.",
    physicalEffects: "High blood pressure, stomach irritation, and heart palpitations."
  },
  "Sugar": {
    details: "Crystalline carbohydrates used as a sweetener, triggering dopamine in similar ways to drugs.",
    symptoms: ["Energy crashes", "Cravings", "Weight gain", "Brain fog", "Skin issues"],
    medication: "Nutritional counseling and stable glucose management.",
    reduction: "Reduce intake of processed foods; replace with complex carbs.",
    avoidance: "Minimize sugary drinks/snacks; read food labels carefully.",
    feeling: "Quick burst of energy (sugar high) followed by a sharp energetic decline.",
    drivers: "Emotional eating, habitual consumption, and ubiquitous availability.",
    mentalEffects: "Mood swings, irritability, and cognitive slowdown (fog).",
    physicalEffects: "Type 2 diabetes, obesity, heart disease, and systemic inflammation."
  },
  "Oxycodone": {
    details: "A semi-synthetic opioid used for moderate to severe pain, often found in Percocet and OxyContin.",
    symptoms: ["Severe drowsiness", "Constipation", "Pinpoint pupils", "Itching", "Sweating"],
    medication: "Buprenorphine, Methadone, and Naltrexone; Naloxone for overdose.",
    reduction: "Strict medical supervision; use alternative non-opioid pain relief strategies.",
    avoidance: "Clear out old prescriptions; be aware of the high risk of rapid addiction.",
    feeling: "Intense euphoria, physical warmth, and a total absence of pain or anxiety.",
    drivers: "Post-surgery recovery, chronic injury, or recreational 'nodding'.",
    mentalEffects: "Brain fog, emotional instability, and profound physical dependency.",
    physicalEffects: "Liver damage (if mixed with acetaminophen), respiratory arrest, and fatal overdose."
  },
  "Alprazolam": {
    details: "A potent, short-acting benzodiazepine primarily used for anxiety and panic disorders, commonly known as Xanax.",
    symptoms: ["Slurred speech", "Loss of coordination", "Memory lapses", "Fatigue", "Dizziness"],
    medication: "Flumazenil for overdose; very slow taper under medical supervision.",
    reduction: "Identify psychological anchors for anxiety and address them without pills.",
    avoidance: "Avoid 'recreational' use at parties; never mix with alcohol (deadly combination).",
    feeling: "Instant 'blackout' of anxiety, sedation, and mental silence.",
    drivers: "Severe panic, high-functioning anxiety, or seeking a shortcut to relaxation.",
    mentalEffects: "Severe memory loss, rebound anxiety, and risk of dementia in long-term use.",
    physicalEffects: "Physical dependence and potentially fatal seizures during withdrawal."
  },
  "Methylphenidate": {
    details: "A central nervous system stimulant used for ADHD and narcolepsy, commonly known as Ritalin.",
    symptoms: ["Nervousness", "Insomnia", "Loss of appetite", "Increased heart rate", "Headache"],
    medication: "Consultation with a psychiatrist for dosage adjustment or non-stimulant alternatives.",
    reduction: "Follow prescription strictly; don't 'double up' for exams.",
    avoidance: "Better sleep hygiene and structured scheduling to reduce reliance on stimulants.",
    feeling: "Enhanced focus, wakefulness, and suppressed appetite.",
    drivers: "Academic performance, focus enhancement, or staying awake.",
    mentalEffects: "Potential for paranoia, aggression, and dependency.",
    physicalEffects: "Heart palpitations, high blood pressure, and stunted growth in children."
  },
  "Poppers": {
    details: "A group of chemicals called alkyl nitrites, often inhaled for short-term recreational effects.",
    symptoms: ["Sudden headache", "Dizziness", "Warm sensations", "Rapid heart rate", "Loss of balance"],
    medication: "No specific medication; stop use immediately if experiencing chest pain.",
    reduction: "Immediate cessation; identify the social/sexual triggers.",
    avoidance: "Be aware of the dangerous interactions with PDE5 inhibitors (Viagra/Cialis).",
    feeling: "Brief 'rush' of warmth, relaxation of smooth muscles, and sensory intensity.",
    drivers: "Sexual enhancement and short-term recreational buzz.",
    mentalEffects: "Disorientation and temporary cognitive fog.",
    physicalEffects: "Fatal blood pressure drop if mixed with other drugs, vision loss, and skin burns."
  },
  "Opium": {
    details: "The air-dried latex from the seed pods of the Papaver somniferum poppy plant.",
    symptoms: ["Lethargy", "Constipation", "Slowed breathing", "Pinpoint pupils", "Nausea"],
    medication: "Same as other opioids; treatment of classical opiate addiction.",
    reduction: "Switch to medically supervised maintenance if dependent.",
    avoidance: "Education on the historical and modern devastating effects of opiate addiction.",
    feeling: "Dream-like sedation, profound tranquility, and total pain relief.",
    drivers: "Historical cultural usage and escaping physical or emotional distress.",
    mentalEffects: "Total lethargy and restructuring of the brain's reward circuits.",
    physicalEffects: "Chronic constipation, respiratory failure, and severe physical dependency."
  }
};
