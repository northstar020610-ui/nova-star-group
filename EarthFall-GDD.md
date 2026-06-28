# GDD: EarthFall

**Versiune:** 1.0 | **Gen:** Survival-Shooter | **Perspectivă:** FPP (First Person Perspective) | **Motor:** Unity | **Studio:** NorthStar Studio

---

## 1. Conceptul Central (The Hook)

*EarthFall* este un survival-shooter axat pe realism și mecanică tactică. Diferențiatorul cheie este **sistemul de luptă "Target-Lock"** (similar MOBA), care se activează automat la prima lovitură, permițând mișcări circulare precise în jurul inamicului, facilitând o dinamică de "dans tactic" în mediul ostil.

## 2. Gameplay & Mecanici de bază

- **Combat:**
  - **Target Mode:** Automatizat la prima lovitură. Caracterul intră într-o stare de "strafe/rotire" în jurul țintei.
  - **Tactical Shooting:** Accent pe acuratețe și gestionarea resurselor (muniție limitată).
- **Survival:**
  - Gestionarea resurselor (loot, crafting, întreținere echipament).
  - Sistem de progresie bazat pe explorare și "home base" (depozitul tehnic ca hub).
- **Art Style:** "Forme de bază + Texturi Realiste" (Kitbashing optimizat). Accent pe lighting și post-processing pentru imersiune.

## 3. Arhitectura Tehnică & Toolchain

- **Modelare:** Blender (Blockout + Bevel Modifier) + Texturi AI/Procedurale.
- **Workflow:**
  - Model → UV Unwrapping rapid → Materialize (pentru PBR maps: Normal, Roughness, Metalness) → Unity.
- **Integrare:** Scripting în C# (sistemele de mișcare și combat), Firebase (pentru salvarea datelor/leaderboards dacă e cazul).

## 4. Structura de Producție (Solo Workflow)

- **Faza 1 (Prototype):** Implementarea sistemului de Target-Lock și a mișcării de bază.
- **Faza 2 (Asset Library):** Crearea setului de "forme de bază" pentru clădiri și inamici.
- **Faza 3 (Lighting/Atmosphere):** Aplicarea texturilor realiste și a post-procesării pentru a defini "look-ul" jocului.
- **Faza 4 (Content):** Populare cu inamici și loot folosind sistemul de kitbashing.

## 5. Smart Integration (The "Extra Mile")

- **Devlogs:** Documentarea întregului proces de dezvoltare pe YouTube (în paralel cu progresul construcției casei).
- **Interconectare:** Jocul va fi testat pe stația de lucru din noul depozit tehnic, profitând de autonomia energetică și infrastructura de rețea.

## 6. Pipeline de dezvoltare (Action Items)

| Prioritate | Task | Scop |
|---|---|---|
| **P0** | Scripting C# Target-Lock | Nucleul combat-ului. |
| **P1** | Pipeline Texturi (Blender → Materialize) | Rezolvarea graficii fără modelare avansată. |
| **P2** | Steam Wishlist Setup | Marketing și validarea interesului. |
| **P3** | Devlog #1 | Documentarea începerii proiectului (pentru audiență). |

## Note de Design (Smart Home Synergy)

Deoarece casa și depozitul vor fi construite în paralel cu jocul, **EarthFall poate deveni "meta-jocul"**.

> *Idee:* Poți crea în joc un model 3D al viitorului depozit tehnic, ca zonă de "safe-house", și să-l actualizezi pe măsură ce progresezi cu construcția reală.
