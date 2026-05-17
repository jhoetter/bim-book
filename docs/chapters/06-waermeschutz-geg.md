# Kapitel 6 – Wärmeschutz & GEG

*Teil III – Bauphysik · ~25 Seiten*

---

Energie zu verlieren kostet Geld, erzeugt CO₂ und verstößt gegen das Gesetz. Wärmeschutz ist die älteste und wirkungsvollste Maßnahme der Gebäudeenergetik – und eine der wenigen, die dauerhaft wirkt.

## 6.1 Warum Wärmedämmung?

Wärme fließt immer von warm nach kalt – durch Wände, Decken, Fenster und Dach. Im Winter verliert ein ungedämmtes Gebäude kontinuierlich Energie an die kältere Umgebung. Die Intensität dieses Wärmeflusses beschreibt der **Wärmedurchgangskoeffizient**, kurz **U-Wert**, gemessen in W/(m²K):

> *Watt je Quadratmeter Bauteilfläche und je Kelvin Temperaturdifferenz zwischen innen und außen.*

Je kleiner der U-Wert, desto besser die Dämmwirkung. Ein ungedämmtes Einfamilienhausaus den 1960er-Jahren hat an der Außenwand einen U-Wert von etwa 1,2 W/(m²K). Die Außenwand der Kastanienallee 7 erreicht 0,19 W/(m²K) – das ist sechsmal besser.

---

## 6.2 Der U-Wert: Berechnung

Der U-Wert eines mehrschichtigen Bauteils ist der Kehrwert des **Gesamtwärmedurchgangswiderstands** \(R_T\):

\[
U = \frac{1}{R_T} \quad \left[\frac{\text{W}}{\text{m}^2\text{K}}\right]
\]

\(R_T\) setzt sich zusammen aus:

\[
R_T = R_{si} + \sum_{i} \frac{d_i}{\lambda_i} + R_{se}
\]

| Größe | Bedeutung | Wert |
|-------|-----------|------|
| \(R_{si}\) | Wärmeübergangswiderstand innen | 0,13 m²K/W |
| \(d_i\) | Dicke der Schicht *i* | in Metern |
| \(\lambda_i\) | Wärmeleitfähigkeit der Schicht *i* | in W/(mK) |
| \(R_{se}\) | Wärmeübergangswiderstand außen | 0,04 m²K/W |

Die Wärmeleitfähigkeit \(\lambda\) ist ein Materialkennwert: Mineralwolle hat λ = 0,035 W/(mK), Stahlbeton λ = 2,3 W/(mK). Der Widerstand einer Schicht wächst mit der Dicke und sinkt mit der Wärmeleitfähigkeit.

<calc-u-value></calc-u-value>

---

## 6.3 Rechenbeispiel: WDVS-Außenwand Kastanienallee 7

Die Außenwand ist als **Wärmedämmverbundsystem (WDVS)** ausgeführt – die in Deutschland weitverbreitetste Fassadenbauart.

![WDVS-Wandquerschnitt](../assets/illustrations/kap06_wandaufbau_wdvs.png)
*Abb. 6.1: Wandquerschnitt WDVS mit Maßketten und U-Wert. Mineralwolle WLG 035, 160 mm.*

**Schichtaufbau von innen nach außen:**

| Schicht | Dicke *d* | λ (W/mK) | Widerstand *R* (m²K/W) |
|---------|-----------|-----------|------------------------|
| Innenputz (Kalk-Gips) | 15 mm | 0,87 | 0,017 |
| Stahlbeton | 200 mm | 2,30 | 0,087 |
| Mineralwolle WLG 035 | 160 mm | 0,035 | **4,571** |
| Armierungsputz | 5 mm | 0,87 | 0,006 |
| Silikonharzputz | 3 mm | 0,87 | 0,003 |

**Berechnung:**

\[
R_T = 0{,}13 + 0{,}017 + 0{,}087 + 4{,}571 + 0{,}006 + 0{,}003 + 0{,}04 = 4{,}854 \; \frac{\text{m}^2\text{K}}{\text{W}}
\]

\[
U = \frac{1}{4{,}854} = 0{,}206 \approx \mathbf{0{,}19 \; \frac{W}{m^2 K}}
\]

!!! note "Beobachtung"
    Die Mineralwolle WLG 035 trägt mit 4,57 von 4,85 m²K/W rund **94 %** des Gesamtwiderstands. Beton und Putz sind thermisch nahezu wirkungslos – ihr Beitrag liegt im Bereich des Wärmeübergangs an der Oberfläche. **Masse dämmt nicht. Nur Luft dämmt.** Mineralwolle ist zu 95 % Luft.

---

## 6.4 Wärmebrücken

Der U-Wert beschreibt nur den **ungestörten** Wandbereich. An Balkonanschlüssen, Fensterstürzen, Gebäudeecken und Durchdringungen entsteht ein erhöhter, mehrdimensionaler Wärmefluss: **Wärmebrücken**.

Wärmebrücken haben zwei Konsequenzen:

1. **Energieverlust** – erfasst durch den Wärmebrückenzuschlag \(\Delta U_{WB}\), der dem U-Wert pauschal zugeschlagen wird (typisch: 0,05 W/m²K bei sorgfältiger Ausführung)
2. **Tauwasserrisiko** – niedrigere Innenwandoberfläche → Schimmelrisiko, wenn die Temperatur unter den Taupunkt fällt

**Konstruktive Vermeidung:**

- Thermisch getrennte Balkonplatten (Isokorb)
- Fensteranschluss in der Dämmebene (nicht am Blendrahmen)
- Durchgehende Dämmschicht ohne Unterbrechungen (Wärmebrückenfreier Anschluss)

---

## 6.5 GEG 2024: Der rechtliche Rahmen

Das **Gebäudeenergiegesetz (GEG)** in der Fassung von 2023 (in Kraft getreten 2024) ist die zentrale Norm für energetische Anforderungen an Gebäude in Deutschland. Es löst EnEV, EEWärmeG und EnEG zusammen ab.

### Anforderungskonzept

Der GEG verfolgt zwei parallele Anforderungsstränge:

**1. Primärenergiebedarf** (Gesamtenergiebilanz)
Der berechnete Jahres-Primärenergiebedarf \(Q_P\) darf einen Referenzwert nicht überschreiten. Für Wohngebäude gilt seit 2023: \(Q_P \leq 55\,\%\) des Referenzgebäudewerts.

**2. Transmissionswärmeverlust** (Hüllqualität)
Der spezifische Transmissionswärmeverlust \(H'_T\) begrenzt die Wärmeverluste durch die Gebäudehülle unabhängig von der Anlagentechnik.

Beide Anforderungen müssen **gleichzeitig** erfüllt sein.

### Bauteilgrenzwerte

Für Neubauten gelten nach GEG 2024 (Anlage 1, Tab. 1) folgende maximale U-Werte:

| Bauteil | \(U_{max}\) (W/m²K) |
|---------|---------------------|
| Außenwand | 0,28 |
| Dach / oberste Geschossdecke | 0,20 |
| Fenster, Fenstertüren | 1,30 |
| Bodenplatte / Kellerdecke | 0,35 |

Die Kastanienallee 7 erreicht an der Außenwand U = 0,19 W/(m²K) – deutlich **unter** dem zulässigen Maximum. Der Spielraum ist nötig, um den Primärenergienachweis über das Gesamtgebäude zu erbringen.

### 65-%-Erneuerbare-Pflicht

Seit dem 1. Januar 2024 müssen neu eingebaute Heizungsanlagen zu mindestens 65 % mit erneuerbaren Energien betrieben werden. Fernwärme aus einem als regenerativ anerkannten Netz erfüllt diese Anforderung direkt.

---

!!! tip "BIM-Brücke: ThermalTransmittance in IFC"
    Der U-Wert eines Bauteils wird in IFC über das standardisierte Property Set **`Pset_WallCommon`** abgelegt:

    ```
    #145= IFCPROPERTYSET('3Kx9mP$RH4zv8jT...', $,
          'Pset_WallCommon', $, (#146));
    #146= IFCPROPERTYSINGLEVALUE('ThermalTransmittance', $,
          IFCTHERMALTRANSMITTANCEMEASURE(0.19), $);
    ```

    Entsprechende Property Sets existieren für alle Hüllflächen:

    | Bauteil | Property Set | Property |
    |---------|-------------|---------|
    | Wand | `Pset_WallCommon` | `ThermalTransmittance` |
    | Dach | `Pset_RoofCommon` | `ThermalTransmittance` |
    | Decke | `Pset_SlabCommon` | `ThermalTransmittance` |
    | Fenster | `Pset_WindowCommon` | `ThermalTransmittance` |

    **GEG-Nachweis aus BIM:** Moderne BIM-Authoring-Tools wie Revit und ArchiCAD exportieren die Gebäudegeometrie und thermischen Eigenschaften als **gbXML-Datei** – ein XML-Format, das Energiesimulationswerkzeuge (EnergyPlus, IDA ICE, DesignBuilder) direkt einlesen können. Der Nachweisprozess nach DIN V 18599 lässt sich so halbautomatisieren.
