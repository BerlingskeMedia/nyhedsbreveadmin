# nyhedsbreveadmin

Dette er en webapp som kan 1) administrere opsætning af nyhedsbreve i "hjulet", 2) oprette smartlinks samt 3) administrere kunder.
De bygges alle i Angular 1.4 og hostes i samme statiske server (Node/S3 bucket).

Der benyttes MDBAPI til alt kommunikation.
Se dokumenatation på [https://github.com/BerlingskeMedia/mdbapi].

# Administration af profil.berlingskemedia.dk
Denne lille applikation skal ændre opsætningen af publishers, nyhedsbreve, interesser, persmissions, locations.

## Publishers
Dette er en simpelt liste, som viser alle publisher og med direkte adgang (inline editing) til at ændre i følgende felter:

- Navn
- BilledeURL (simpel tekststreng)
- Hidden (boolean)
- Enabled (boolean)

Feltet `id`skal fremgå af listen (til hurtig reference.)

Data hentes og gemmes via MDBAPI på endpoint `/publishers`.

Det skal være muligt at oprette ny publisher fra dette view.

## Nyhedsbreve
Dette er en simpelt liste, som viser alle nyhedsbreve (uden inline editing.) Det var være muligt at filtrere på navn og/eller publisher. Feltet `id` skal fremgå.

Ved redigering af nyhedsbrev, åbens et nyt view med følgende felter:

- Navn
- Publisher (drop down)
- Beskrivelse (textarea - ikke HTML)
- BilledeURL
- Hidden (boolean)
- Enabled (boolean)

Det skal være muligt at oprette nyt nyhedsbrev fra dette view.

Data hentes og gemmes via MDBAPI på endpoint `/nyhedsbreve`.

## Interesser
Dette er en simpel liste over interesser. Det skal være muligt at tiltrere på navn. Feltet `id` skal fremgå.
Det skal være muligt at oprette en ny interesse fra dette view.
Ved klik kan interessen redigeres, bestående af følgende felter:

- Navn
- Beskrivelse (textarea - ikke HTML)
- (Parent - når vi ved hvad det indebærer)
- Hidden (boolean)
- Enabled (boolean)

Det udestår hvordan hierarkiet bygges. Indtil dette er afklaret, arbejder vi med "første" niveau.

Data hentes og gemmes via MDBAPI på endpoint `/interesser`.

## Permissions
Dette er en simpel liste over persmission

TODO

## Location
Simpel liste til at se alle locations, bestående af:

- Id
- Navn (kan redigeres)

Data hentes og gemmes via MDBAPI på endpoint `/locations`.

# Smartlink builder
Dette side anvende til at hjælpe med at opbygge smartlinks. Siden består primært af en formular med følgende felter:

- Nyhedsbreve (multiselect af `/nyhedsbreve`)
- Interesser (multiselect af `/interesser`)
- Permissions (multiselect af `/permissions`)
- Location (tekst indtastning, med knap til at oprette en location via POST `/location` - returnerer location_id som skal anvendes i smartlinket. Teksten kan ændres via PUT.)
- Flow (Drop down med **simpel** og **doubleopt**)
- Action (Drop down med **tilmeld** og **afmeld**)
- Startdato (datepicker)
- Slutdato (datepicker, ikke påkrævet)
- Kunde felt (Drop down med **email** og **ekstern id**)
- Landingpage (ikke påkrævet,
 
Nedenunder skal man kunne se et kompileret smartlink baseret på ovenstående valg. Smartlinket skal præsenteres som en tekst der er let at kopiere (CTRL-C). Der skal være et link samt en HTML form.

Der linkes/form-postes til [http://profil.berlingskemedia.dk/smartlinks]

# Administration af kunder
Første view indeholder en søge-funktionalitet, hvorfra man kan søge på kunder i MDBAPI (endpoind `/users`). Man skal kunne søge på:

- Email
- Ekstern ID
- Fornavn
- Efternavn
- Postnummer
- Adresse
- Nyhedsbreve
- Interesser
- Permission

Ved klik på kunder, skal man vise en formular til at ændre i stamdata samt få et overblik over kundens historik.
Redigér-siden skal have en knap, hvor der hurtigt kan sende en "login-email". Dvs. POST `/mails/profile-page-link`.

TODO: Den eksisterende PUT `/users` skal ændres til at være en PATCH. Og der skal laves en ny PUT som er idempotent, dvs. den overskriver evt. nyhedsbreve, interesser og permissions. Daniel spec'er til Jesper.

