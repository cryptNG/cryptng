import Component from '@glimmer/component'; 
import { tracked } from '@glimmer/tracking';

export default class BaseComponent extends Component {
    @tracked enteredXmlContent = `<?xml version="1.0" encoding="utf-16" ?>
    <invoice>
        <invoicenumber>CNG-1001</invoicenumber>
        <invoicedate>2022-10-31</invoicedate>
        <purchaseordernumber>1949/2020</purchaseordernumber>
        <duedate>2023-02-22</duedate>
        <address type="shipto">
            <name>Headquarter Gredos</name>
            <street>Tower 1 Floor 97 Apt 10</street>
            <zipcode>12345</zipcode>
            <city>Trevelez</city>
            <country>Spain</country>
        </address>
        <address type="billto">
            <name>Office One Gredos</name>
            <street>Tower 2 Floor 0 Apt 1</street>
            <zipcode>12345</zipcode>
            <city>Trevelez</city>
            <country>Spain</country>
        </address>
        <lineitems>
            <lineitem>
                <quantity>10</quantity>
                <name>Services</name>
                <description>Cost of various services</description>
                <unitprice>€ 100.00</unitprice>
                <tax> 19%</tax>
                <unit>h</unit>
                <price>€ 1000.00</price>
            </lineitem>
            <lineitem>
                <quantity>5</quantity>
                <name>Consulting</name>
                <description>Consultant for your business</description>
                <unitprice>€ 1,000.00</unitprice>
                <tax> 19%</tax>
                <unit>d</unit>
                <price>€ 5,000.00</price>
            </lineitem>
            <lineitem>
                <quantity>1</quantity>
                <name>Materials</name>
                <description>Cost of materials and supplies</description>
                <unitprice>€ 950.00</unitprice>
                <tax> 19%</tax>
                <unit> p</unit>
                <price>€ 950.00</price>
            </lineitem>
        </lineitems>
        <subtotal>€ 6,950.00</subtotal>
        <tax-percentage>19%</tax-percentage>
        <tax>€ 1,320.50</tax>
        <total>€ 8,270.50</total>
        <terms>Instant</terms>
    </invoice>
    `;
  @tracked enteredXslContent = `<?xml version="1.0" encoding="utf-16"?>
  <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
      xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:msxsl="urn:schemas-microsoft-com:xslt"
      exclude-result-prefixes="msxsl">
      <xsl:output method="xml" indent="yes"/>
      <xsl:template match="/">
          <fo:root font-family="Helvetica, SimSun">
              <fo:layout-master-set>
                  <fo:simple-page-master master-name="A4" page-height="29.7cm" page-width="21.0cm"
                      margin-top="1cm" margin-left="1.5cm" margin-right="2cm" margin-bottom="1cm">
                      <!-- Page template goes here -->
                      <fo:region-body margin-top="30mm" margin-bottom="20mm"/>
                      <fo:region-before region-name="xsl-region-before" extent="3cm"/>
                      <fo:region-after region-name="xsl-region-after" extent="4cm"/>
                  </fo:simple-page-master>
              </fo:layout-master-set>
              <fo:page-sequence master-reference="A4">
                  <!-- Page content goes here -->
                  <fo:static-content flow-name="xsl-region-before">
                      
                      <fo:block>
                          <fo:table>
                              <fo:table-column column-width="9cm"/>
                              <fo:table-column column-width="9cm"/>
                              <fo:table-body>
                                  <fo:table-row font-size="16pt" line-height="20px"
                                      background-color="#3e73b9" color="white">
                                      <fo:table-cell padding-left="5pt" padding-top="2pt">
                                          <fo:block> CRYPTNG &#174;</fo:block>
                                      </fo:table-cell>
                                      <fo:table-cell padding-top="2pt" padding-right="5pt">
                                          <fo:block text-align="right"> INVOICE </fo:block>
                                      </fo:table-cell>
                                  </fo:table-row>
                                  <fo:table-row>
                                      <fo:table-cell padding-left="0pt" padding-top="10pt">
                                          <fo:block>Yavuz IT Consulting&#x2028;Kalbersnacken 5&#x2028;59759 Arnsberg&#x2028;Germany</fo:block>
                                      </fo:table-cell>
                                      <fo:table-cell>
                                          <fo:block> </fo:block>
                                      </fo:table-cell>
                                  </fo:table-row>
                              </fo:table-body>
                          </fo:table>
                          <fo:instream-foreign-object padding-top="140mm">
                              <svg:svg
                                  width="200mm"
                                  height="25mm"
                                  viewBox="20 1.5 70 25"
                                  version="1.1"
                                  id="svg5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:svg="http://www.w3.org/2000/svg">
                                  <svg:defs
                                      id="defs28250" />
                                  <svg:g
                                      id="layer1"
                                      transform="translate(-20.132561,-84) scale(0.65)">
                                      <svg:text
         xml:space="preserve"
         style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:10.1008px;font-family:Helvetica;fill:#b8dff3;fill-opacity:1;stroke-width:0.0526088"
         x="135.128502"
         y="164.39116"
         text-anchor="end"
         font-variant="small-caps"
         id="text2679-4">Pdf Weaver</svg:text>
                                      <svg:g
                                          id="g23081">
                                          <svg:g
                                              id="g10509"
                                              transform="matrix(0.03245599,0,0,0.03245599,11.891017,130.62382)"
                                              style="stroke-width:15.4055;stroke-miterlimit:4;stroke-dasharray:none">
                                              <svg:path
                                                  id="path841"
                                                  style="fill:#b8dff3;stroke-width:16.8444;stroke-miterlimit:4;stroke-dasharray:none"
                                                  class="st1"
                                                  d="M 1250,429.70703 1048.1582,764.61719 1250,883.90625 1451.8418,764.61719 Z"
                                                  transform="matrix(0.91457574,0,0,0.91457574,-0.01967725,0)" />
                                              <svg:path
                                                  class="st1"
                                                  d="m 1143.2,994.4 184.7,-260.1 -184.7,109 -184.6,-109 z"
                                                  id="path843"
                                                  style="fill:#b8dff3;stroke-width:15.4055;stroke-miterlimit:4;stroke-dasharray:none" />
                                              <svg:circle
                                                  style="fill:none;stroke:#b8dff3;stroke-width:15.4055;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                                                  id="path952"
                                                  cx="1149.3132"
                                                  cy="715.04291"
                                                  r="425.51636" />
                                          </svg:g>
                                          <svg:text
           xml:space="preserve"
           style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:15.2402px;line-height:1.25;font-family:Broadway;letter-spacing:0px;word-spacing:0px;fill:#f1f1f1;fill-opacity:1;stroke:none;stroke-width:0.0793767"
           x="67.304817"
           y="151.21399"
           id="text2679"><svg:tspan
             id="tspan2677"
             style="font-style:normal;font-variant:normal;font-weight:300;font-stretch:normal;font-size:14.1px;font-family:Helvetica, sans-serif;fill:#b8dff3;fill-opacity:1;stroke-width:0.0793767"
             x="67.304817"
             y="151.21399">CRYPTNG</svg:tspan></svg:text>
                                          <svg:path
                                              style="fill:none;fill-opacity:1;stroke:#b8dff3;stroke-width:0.479678;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
                                              d="m 62.92348,154.47795 h 72.45544"
                                              id="path10544" />
                                      </svg:g>
                                  </svg:g>
                              </svg:svg>
                          </fo:instream-foreign-object>
                      </fo:block>
                      <fo:block margin-left="65mm">
                          <fo:inline text-decoration="underline">
                              <fo:basic-link external-destination="url(https://pdf-weaver.io)" color="#3e73b9">https://pdf-weaver.io</fo:basic-link>
                          </fo:inline>
                      </fo:block>
                  </fo:static-content>
                  <fo:static-content flow-name="xsl-region-after">
                      <fo:block>
                          <fo:table>
                              <!--  cellpadding="2" cellspacing="0" border="0" class="report"-->
                              <fo:table-column column-width="140mm"/>
                              <fo:table-column column-width="60mm"/>
                              <fo:table-body>
                                  <fo:table-row>
                                      <fo:table-cell>
                                          <fo:block font-weight="bold"> Terms &amp; Conditions </fo:block>
                                          <fo:block space-after="15pt"> Payment is due within
                                                  <xsl:value-of select="invoice/terms"/>
                                          </fo:block>
                                          <fo:block font-weight="bold"> Payment Information</fo:block>
                                          <fo:block> Bank: Sample Bank&#x2028; IBAN: DE #########&#x2028; Account No: ## ## ####</fo:block>
                                      </fo:table-cell>
                                      <fo:table-cell>
                                          <fo:block>
                                              <fo:instream-foreign-object>
                                                  <svg xmlns:xlink="http://www.w3.org/1999/xlink"
                                                    width="3cm" height="3cm" class="barcode-canvas"
                                                    viewBox="0 0 200 200" version="1.1"
                                                    style="shape-rendering:crispEdges;"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g text-rendering="geometricPrecision">
                                                    <rect x="0" y="0" width="158" height="171"
                                                    fill="#ffffff"/>
                                                    <rect x="7" y="7" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="7" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="7" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="7" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="7" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="7" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="72" y="12" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="12" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="17" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="77" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="87" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="17" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="17" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="22" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="22" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="22" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="22" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="22" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="92" y="22" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="22" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="22" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="22" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="22" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="27" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="27" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="27" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="52" y="27" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="72" y="27" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="27" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="27" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="27" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="27" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="27" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="32" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="32" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="32" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="62" y="32" width="25" height="5"
                                                    fill="#000000"/>
                                                    <rect x="92" y="32" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="32" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="32" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="32" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="37" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="37" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="37" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="37" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="77" y="37" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="87" y="37" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="37" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="37" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="37" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="52" y="42" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="42" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="42" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="47" width="25" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="47" width="20" height="5"
                                                    fill="#000000"/>
                                                    <rect x="62" y="47" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="47" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="102" y="47" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="112" y="47" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="122" y="47" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="132" y="47" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="47" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="52" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="27" y="52" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="52" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="52" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="52" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="87" y="52" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="102" y="52" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="52" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="57" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="57" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="57" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="72" y="57" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="57" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="57" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="122" y="57" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="62" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="22" y="62" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="32" y="62" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="62" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="62" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="62" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="62" width="20" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="62" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="67" width="20" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="67" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="52" y="67" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="67" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="77" y="67" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="122" y="67" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="137" y="67" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="67" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="27" y="72" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="42" y="72" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="87" y="72" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="72" width="40" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="72" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="77" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="27" y="77" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="77" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="62" y="77" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="77" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="77" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="112" y="77" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="82" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="42" y="82" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="62" y="82" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="77" y="82" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="82" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="112" y="82" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="122" y="82" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="132" y="82" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="82" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="27" y="87" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="87" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="62" y="87" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="87" y="87" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="137" y="87" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="92" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="22" y="92" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="92" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="92" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="92" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="87" y="92" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="102" y="92" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="92" width="25" height="5"
                                                    fill="#000000"/>
                                                    <rect x="147" y="92" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="97" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="27" y="97" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="97" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="97" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="72" y="97" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="97" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="102" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="102" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="32" y="102" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="42" y="102" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="52" y="102" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="102" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="102" width="20" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="102" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="102" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="107" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="107" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="107" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="107" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="77" y="107" width="20" height="5"
                                                    fill="#000000"/>
                                                    <rect x="102" y="107" width="45" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="112" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="87" y="112" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="112" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="112" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="137" y="112" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="117" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="117" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="117" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="117" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="117" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="117" y="117" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="117" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="122" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="122" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="62" y="122" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="77" y="122" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="122" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="122" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="122" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="127" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="127" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="127" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="127" width="20" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="127" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="92" y="127" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="107" y="127" width="25" height="5"
                                                    fill="#000000"/>
                                                    <rect x="137" y="127" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="132" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="132" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="132" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="132" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="132" width="25" height="5"
                                                    fill="#000000"/>
                                                    <rect x="97" y="132" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="112" y="132" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="122" y="132" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="132" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="137" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="17" y="137" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="137" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="137" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="72" y="137" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="102" y="137" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="112" y="137" width="20" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="137" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="142" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="37" y="142" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="142" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="57" y="142" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="142" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="82" y="142" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="102" y="142" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="132" y="142" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="142" y="142" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="7" y="147" width="35" height="5"
                                                    fill="#000000"/>
                                                    <rect x="47" y="147" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="67" y="147" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="77" y="147" width="10" height="5"
                                                    fill="#000000"/>
                                                    <rect x="92" y="147" width="15" height="5"
                                                    fill="#000000"/>
                                                    <rect x="112" y="147" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="127" y="147" width="5" height="5"
                                                    fill="#000000"/>
                                                    <rect x="137" y="147" width="5" height="5"
                                                    fill="#000000"/>
                                                    </g>
                                                  </svg>
                                              </fo:instream-foreign-object>
                                          </fo:block>
                                      </fo:table-cell>
                                  </fo:table-row>
                              </fo:table-body>
                          </fo:table>
                      </fo:block>
                  </fo:static-content>
                  <fo:flow flow-name="xsl-region-body" line-height="20pt">
                      <xsl:apply-templates/>
                  </fo:flow>
              </fo:page-sequence>
          </fo:root>
      </xsl:template>
      <xsl:template match="invoice">
          <fo:block space-before="100pt" width="18cm" padding-top="10mm">
              <fo:table>
                  <fo:table-column column-width="6cm"/>
                  <fo:table-column column-width="6cm"/>
                  <fo:table-column column-width="3cm"/>
                  <fo:table-column column-width="3cm"/>
                  <fo:table-body>
                      <fo:table-row>
                          <fo:table-cell>
                              <fo:block>
                                  <fo:inline font-weight="bold">Bill To</fo:inline>
                                  <xsl:call-template name="address">
                                      <xsl:with-param name="address"
                                          select="./address[@type = 'billto']"/>
                                  </xsl:call-template>
                              </fo:block>
                          </fo:table-cell>
                          <fo:table-cell>
                              <fo:block>
                                  <fo:inline font-weight="bold">Ship To</fo:inline>
                                  <xsl:call-template name="address">
                                      <xsl:with-param name="address"
                                          select="./address[@type = 'shipto']"/>
                                  </xsl:call-template>
                              </fo:block>
                          </fo:table-cell>
                          <fo:table-cell>
                              <fo:block text-align="right">
                                  <fo:inline font-weight="bold">Invoice #</fo:inline>&#x2028;
                                      <fo:inline font-weight="bold">Invoice Date</fo:inline>&#x2028;
                                      <fo:inline font-weight="bold"> P.O.#</fo:inline>&#x2028;
                                      <fo:inline font-weight="bold">Due Date</fo:inline>&#x2028;
                              </fo:block>
                          </fo:table-cell>
                          <fo:table-cell>
                              <fo:block text-align="right">
                                  <xsl:value-of select="./invoicenumber"/>&#x2028; <xsl:value-of
                                      select="./invoicedate"/>&#x2028; <xsl:value-of
                                      select="./purchaseordernumber"/>&#x2028; <xsl:value-of
                                      select="./duedate"/>&#x2028; </fo:block>
                          </fo:table-cell>
                      </fo:table-row>
                  </fo:table-body>
              </fo:table>
          </fo:block>
          <fo:block space-before="35pt">
              <fo:table line-height="20px">
                  <fo:table-column column-width="1.5cm"/>
                  <fo:table-column column-width="1cm"/>
                  <fo:table-column column-width="8.5cm"/>
                  <fo:table-column column-width="3cm"/>
                  <fo:table-column column-width="1.5cm"/>
                  <fo:table-column column-width="2.5cm"/>
                  <fo:table-header>
                      <fo:table-row background-color="#f5f5f5" text-align="center" font-weight="bold">
                          <fo:table-cell border="1px solid #b8b6b6">
                              <fo:block>QTY</fo:block>
                          </fo:table-cell>
                          <fo:table-cell border="1px solid #b8b6b6">
                              <fo:block>UNIT</fo:block>
                          </fo:table-cell>
                          <fo:table-cell border="1px solid #b8b6b6">
                              <fo:block>DESCRIPTION</fo:block>
                          </fo:table-cell>
                          <fo:table-cell border="1px solid #b8b6b6">
                              <fo:block>UNIT PRICE</fo:block>
                          </fo:table-cell>
                          <fo:table-cell border="1px solid #b8b6b6">
                              <fo:block>TAX</fo:block>
                          </fo:table-cell>
                          <fo:table-cell border="1px solid #b8b6b6">
                              <fo:block>PRICE</fo:block>
                          </fo:table-cell>
                      </fo:table-row>
                  </fo:table-header>
                  <fo:table-body>
                      <xsl:apply-templates select="lineitems/lineitem"/>
                      <fo:table-row>
                          <fo:table-cell number-columns-spanned="5" text-align="right"
                              padding-right="3pt">
                              <fo:block>Subtotal</fo:block>
                          </fo:table-cell>
                          <fo:table-cell text-align="right" padding-right="3pt"
                              border-left="1px solid #b8b6b6" border-right="1px solid #b8b6b6">
                              <fo:block>
                                  <xsl:value-of select="subtotal"/>
                              </fo:block>
                          </fo:table-cell>
                      </fo:table-row>
                      <fo:table-row>
                          <fo:table-cell number-columns-spanned="5" text-align="right"
                              padding-right="3pt">
                              <fo:block> VAT <xsl:value-of select="tax-percentage"/>
                              </fo:block>
                          </fo:table-cell>
                          <fo:table-cell text-align="right" padding-right="3pt"
                              border-left="1px solid #b8b6b6" border-right="1px solid #b8b6b6">
                              <fo:block font-family="Helvetica, SimSun">
                                  <xsl:value-of select="tax"/>
                              </fo:block>
                          </fo:table-cell>
                      </fo:table-row>
                      <fo:table-row font-weight="bold">
                          <fo:table-cell number-columns-spanned="5" text-align="right"
                              padding-right="3pt">
                              <fo:block>Total</fo:block>
                          </fo:table-cell>
                          <fo:table-cell text-align="right" padding-right="3pt"
                              background-color="#f5f5f5" border="1px solid #b8b6b6">
                              <fo:block>
                                  <xsl:value-of select="total"/>
                              </fo:block>
                          </fo:table-cell>
                      </fo:table-row>
                  </fo:table-body>
              </fo:table>
          </fo:block>
      </xsl:template>
      <xsl:template name="address">
          <xsl:param name="address"/>
          <fo:block>
              <xsl:value-of select="$address/name"/>&#x2028; <xsl:value-of select="$address/street"
              />&#x2028; <xsl:value-of select="$address/zipcode"/>&#160;<xsl:value-of
                  select="$address/city"/>
          </fo:block>
      </xsl:template>
      <xsl:template match="lineitem">
          <fo:table-row>
              <fo:table-cell border="1px solid #b8b6b6" text-align="center">
                  <fo:block>
                      <xsl:value-of select="quantity"/>
                  </fo:block>
              </fo:table-cell>
              <fo:table-cell border="1px solid #b8b6b6" text-align="center">
                  <fo:block>
                      <xsl:value-of select="unit"/>
                  </fo:block>
              </fo:table-cell>
  
              <fo:table-cell border="1px solid #b8b6b6" padding-left="3pt">
                  <fo:block>
                      <xsl:value-of select="name"/>
                  </fo:block>
                  <fo:block font-size="small">
                      <xsl:value-of select="description"/>
                  </fo:block>
              </fo:table-cell>
              <fo:table-cell border="1px solid #b8b6b6" text-align="right" padding-right="3pt">
                  <fo:block>
                      <xsl:value-of select="unitprice"/>
                  </fo:block>
              </fo:table-cell>
              <fo:table-cell border="1px solid #b8b6b6" text-align="right" padding-right="3pt">
              <fo:block>
                  <xsl:value-of select="tax"/>
              </fo:block>
              </fo:table-cell>
              <fo:table-cell border="1px solid #b8b6b6" text-align="right" padding-right="3pt">
                  <fo:block>
                      <xsl:value-of select="price"/>
                  </fo:block>
              </fo:table-cell>
          </fo:table-row>
      </xsl:template>
  </xsl:stylesheet>
   `;
}