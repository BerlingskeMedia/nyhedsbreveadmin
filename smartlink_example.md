
Et smartlink som tilmelder personen permission 300.

```
HTTP GET - SIGN-UP KUN PÅ EMAIL ADRESSE
(BRUGES TIL SKOVJACOBSENS BLADSALGS CMS)
http://apps.adlifter.com/plugin/?application_key=70c4dd8af56f5dad9d5483513f049eb6&command=cmd_berlingske_quicksignup&customer_key=a40e4703a823d1d11977928620c6ead0&nlids=300&intids=&stack_key=dcc741e9544beb16005993da368b855c&lid=1799&mid=1&rtype=1&url=&email=<EMAIL>&action=1

HTTP GET - SIGN-UP KUN PÅ EMAIL ADRESSE
(BRUGES TIL ONE-CLICK SIGN-UP I EMAILS ELLER WEBSITES)
http://apps.adlifter.com/plugin/?application_key=70c4dd8af56f5dad9d5483513f049eb6&command=cmd_berlingske_quicksignup&customer_key=a40e4703a823d1d11977928620c6ead0&nlids=300&intids=&stack_key=dcc741e9544beb16005993da368b855c&lid=1799&mid=1&rtype=1&url=&email=%email%&action=1

HTTP GET - SIGN-UP KUN PÅ EMAIL ADRESSE
(BRUGES TIL ONE-CLICK SIGN-UP I EMAILS ELLER WEBSITES FRA SMARTFOCUS)
http://apps.adlifter.com/plugin/?application_key=70c4dd8af56f5dad9d5483513f049eb6&command=cmd_berlingske_quicksignup&customer_key=a40e4703a823d1d11977928620c6ead0&nlids=300&intids=&stack_key=dcc741e9544beb16005993da368b855c&lid=1799&mid=1&rtype=1&url=&email=[EMV FIELD]EMAIL[EMV /FIELD]&action=1

HTTP GET - SIGN-UP MED ALLE STAMDATA
(BRUGES TIL ONE-CLICK SIGN-UP I EMAILS ELLER WEBSITES)
http://apps.adlifter.com/plugin/?application_key=70c4dd8af56f5dad9d5483513f049eb6&command=cmd_berlingske_quicksignup&customer_key=a40e4703a823d1d11977928620c6ead0&nlids=300&intids=&stack_key=dcc741e9544beb16005993da368b855c&lid=1799&mid=1&rtype=1&url=&email=%email%&action=1&firma=%firma%&fornavn=%fornavn%&efternavn=%efternavn%&land=%land%&postnummer=%postnummer%&bynavn=%bynavn%&vejnavn=%vejnavn%&husnummer=%husnummer%&husbogstav=%husbogstav%&etage=%etage%&sidedoer=%sidedoer%&telefon=%telefon%&mobil=%mobil%&foedselsaar=%foedselsaar%&firma_adresse=%firma_adresse%&koen=%koen%

HTTP POST - SIGN-UP KUN PÅ EMAIL ADRESSE
(BRUGES SOM TILMELDINGS- ELLER AFMELDINGS FORMULAR PÅ WEB-SIDER)
<form action="http://apps.adlifter.com/plugin/" method="POST"><input name="stack_key" type="hidden" value="dcc741e9544beb16005993da368b855c"/><input name="application_key" type="hidden" value="70c4dd8af56f5dad9d5483513f049eb6"/><input name="command" type="hidden" value="cmd_berlingske_quicksignup"/><input name="customer_key" type="hidden" value="a40e4703a823d1d11977928620c6ead0"/><input name="lid" type="hidden" value="1799"/><input name="mid" type="hidden" value="1"/><input name="rtype" type="hidden" value="1"/><input name="nlids" type="hidden" value="300"/><input name="intids" type="hidden" value=""/><input name="url" type="hidden" value=""/><input name="action" type="hidden" value="1"/>email: <input name="email"/><input type="submit" value="Tilmeld" /></form>

HTTP POST - SIGN-UP MED ALLE STAMDATA
(BRUGES SOM TILMELDINGS- ELLER AFMELDINGS FORMULAR PÅ WEB-SIDER)
<form action="http://apps.adlifter.com/plugin/" method="POST"><input name="stack_key" type="hidden" value="dcc741e9544beb16005993da368b855c"/><input name="application_key" type="hidden" value="70c4dd8af56f5dad9d5483513f049eb6"/><input name="command" type="hidden" value="cmd_berlingske_quicksignup"/><input name="customer_key" type="hidden" value="a40e4703a823d1d11977928620c6ead0"/><input name="lid" type="hidden" value="1799"/><input name="mid" type="hidden" value="1"/><input name="rtype" type="hidden" value="1"/><input name="nlids" type="hidden" value="300"/><input name="intids" type="hidden" value=""/><input name="url" type="hidden" value=""/><input name="action" type="hidden" value="1"/>email: <input name="email"/><input name="firma"/><input name="fornavn"/><input name="efternavn"/><input name="land"/><input name="postnummer"/><input name="bynavn"/><input name="vejnavn"/><input name="husnummer"/><input name="husbogstav"/><input name="etage"/><input name="sidedoer"/><input name="telefon"/><input name="mobil"/><input name="foedselsaar"/><input name="firma_adresse"/><input type="radio" name="koen" value="K">Kvinde</input><input type="radio" name="koen" value="M">Mand</input><input type="submit" value="Tilmeld" /></form>

XML
(FIL-LEVERINGSFORMAT TIL OVERFØRSEL I EXCEL)
http://apps.adlifter.com/plugin/?application_key=70c4dd8af56f5dad9d5483513f049eb6&command=cmd_berlingske_quicksignup&customer_key=a40e4703a823d1d11977928620c6ead0&nlids=300&intids=&stack_key=dcc741e9544beb16005993da368b855c&lid=1799&mid=1&rtype=2&url=&email=%email%&firma=%firma%&fornavn=%fornavn%&efternavn=%efternavn%&land=%land%&postnummer=%postnummer%&bynavn=%bynavn%&vejnavn=%vejnavn%&husnummer=%husnummer%&husbogstav=%husbogstav%&etage=%etage%&sidedoer=%sidedoer%&telefon=%telefon%&mobil=%mobil%&foedselsaar=%foedselsaar%&firma_adresse=%firma_adresse%&koen=%koen%&action=1
```
