<?xml version="1.0" encoding="utf-16"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl">
	<xsl:output method="xml" indent="yes"/>
	<xsl:template match="/">
		<fo:root font-family="Helvetica, SimSun">
			<fo:layout-master-set>
				<fo:simple-page-master master-name="A4" page-height="29.7cm" page-width="21.0cm" margin-top="1cm" margin-left="2cm" margin-right="2cm" margin-bottom="1cm">
					<!-- Page template goes here -->
					<fo:region-body  margin-top="30mm" margin-bottom="20mm"/>
					<fo:region-before region-name="xsl-region-before" extent="3cm"/>
					<fo:region-after region-name="xsl-region-after" extent="4cm"/>

				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="A4">
				<!-- Page content goes here -->
				<fo:static-content flow-name="xsl-region-before">
					<fo:block>

						<fo:table>
							<fo:table-column column-width="8.5cm"/>
							<fo:table-column column-width="8.5cm"/>
							<fo:table-body>
								<fo:table-row font-size="16pt" line-height="30px" background-color="#3e73b9" color="white">
									<fo:table-cell padding-left="5pt" padding-top="2pt">
										<fo:block>
											Novent Concepts
										</fo:block>
									</fo:table-cell>
									<fo:table-cell padding-top="2pt" padding-right="5pt">
										<fo:block text-align="right">
											INVOICE
										</fo:block>
									</fo:table-cell>
								</fo:table-row>
								<fo:table-row>
									<fo:table-cell padding-left="5pt" padding-top="5pt">
										<fo:block>
											CryptoVoxel Miami&#x2028;
											CryptNG HQ
										</fo:block>
									</fo:table-cell>
									<fo:table-cell>
										<fo:block>

										</fo:block>
									</fo:table-cell>
								</fo:table-row>
							</fo:table-body>
						</fo:table>
						<fo:instream-foreign-object>
							<svg:svg version="1.1" id="Layer_1" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21.0cm" height="29.7cm"
							   viewBox="0 0 1920 1920" enable-background="new 0 0 1920 1920" xml:space="preserve">
               <svg:g transform="translate(-100, 0) scale(0.8)">
               	<svg:polygon fill="#8A92B2" fill-opacity="0.2" points="959.8,80.7 420.1,976.3 959.8,731 	"/>
               	<svg:polygon fill="#62688F" fill-opacity="0.2" points="959.8,731 420.1,976.3 959.8,1295.4 	"/>
               	<svg:polygon fill="#62688F" fill-opacity="0.2" points="1499.6,976.3 959.8,80.7 959.8,731 	"/>
               	<svg:polygon fill="#454A75" fill-opacity="0.2" points="959.8,1295.4 1499.6,976.3 959.8,731 	"/>
               	<svg:polygon fill="#8A92B2" fill-opacity="0.2" points="420.1,1078.7 959.8,1839.3 959.8,1397.6 	"/>
               	<svg:polygon fill="#62688F" fill-opacity="0.2" points="959.8,1397.6 959.8,1839.3 1499.9,1078.7 	"/>
               </svg:g>
               </svg:svg>
						</fo:instream-foreign-object>
					</fo:block>
				</fo:static-content>
				<fo:static-content flow-name="xsl-region-after">
					<fo:block>
						<fo:table>
							<!--  cellpadding="2" cellspacing="0" border="0" class="report"-->

							<fo:table-column column-width="140mm"/>
							<fo:table-column column-width="50mm"/>

							<fo:table-body>
								<fo:table-row>
									<fo:table-cell>
										<fo:block font-weight="bold">
											Terms &amp; Conditions
										</fo:block>
										<fo:block space-after="15pt">
											Payment is due within <xsl:value-of select="invoice/terms" />
										</fo:block>
										<fo:block>
											Bank of CryptNG&#x2028;
											Account number: cryptng.eth
										</fo:block>
									</fo:table-cell>
									<fo:table-cell>
										<fo:block>
											<fo:instream-foreign-object>
												<svg xmlns:xlink="http://www.w3.org/1999/xlink" width="3cm" height="3cm" class="barcode-canvas" viewBox="0 0 200 200" version="1.1" style="shape-rendering:crispEdges;" xmlns="http://www.w3.org/2000/svg">
													<g text-rendering="geometricPrecision">
														<rect x="0" y="0" width="158" height="171" fill="#ffffff" />
														<rect x="7" y="7" width="35" height="5" fill="#000000" />
														<rect x="57" y="7" width="5" height="5" fill="#000000" />
														<rect x="67" y="7" width="5" height="5" fill="#000000" />
														<rect x="82" y="7" width="10" height="5" fill="#000000" />
														<rect x="97" y="7" width="10" height="5" fill="#000000" />
														<rect x="117" y="7" width="35" height="5" fill="#000000" />
														<rect x="7" y="12" width="5" height="5" fill="#000000" />
														<rect x="37" y="12" width="5" height="5" fill="#000000" />
														<rect x="47" y="12" width="5" height="5" fill="#000000" />
														<rect x="57" y="12" width="5" height="5" fill="#000000" />
														<rect x="72" y="12" width="15" height="5" fill="#000000" />
														<rect x="97" y="12" width="5" height="5" fill="#000000" />
														<rect x="107" y="12" width="5" height="5" fill="#000000" />
														<rect x="117" y="12" width="5" height="5" fill="#000000" />
														<rect x="147" y="12" width="5" height="5" fill="#000000" />
														<rect x="7" y="17" width="5" height="5" fill="#000000" />
														<rect x="17" y="17" width="15" height="5" fill="#000000" />
														<rect x="37" y="17" width="5" height="5" fill="#000000" />
														<rect x="67" y="17" width="5" height="5" fill="#000000" />
														<rect x="77" y="17" width="5" height="5" fill="#000000" />
														<rect x="87" y="17" width="5" height="5" fill="#000000" />
														<rect x="97" y="17" width="5" height="5" fill="#000000" />
														<rect x="107" y="17" width="5" height="5" fill="#000000" />
														<rect x="117" y="17" width="5" height="5" fill="#000000" />
														<rect x="127" y="17" width="15" height="5" fill="#000000" />
														<rect x="147" y="17" width="5" height="5" fill="#000000" />
														<rect x="7" y="22" width="5" height="5" fill="#000000" />
														<rect x="17" y="22" width="15" height="5" fill="#000000" />
														<rect x="37" y="22" width="5" height="5" fill="#000000" />
														<rect x="47" y="22" width="15" height="5" fill="#000000" />
														<rect x="67" y="22" width="10" height="5" fill="#000000" />
														<rect x="92" y="22" width="5" height="5" fill="#000000" />
														<rect x="107" y="22" width="5" height="5" fill="#000000" />
														<rect x="117" y="22" width="5" height="5" fill="#000000" />
														<rect x="127" y="22" width="15" height="5" fill="#000000" />
														<rect x="147" y="22" width="5" height="5" fill="#000000" />
														<rect x="7" y="27" width="5" height="5" fill="#000000" />
														<rect x="17" y="27" width="15" height="5" fill="#000000" />
														<rect x="37" y="27" width="5" height="5" fill="#000000" />
														<rect x="52" y="27" width="5" height="5" fill="#000000" />
														<rect x="72" y="27" width="5" height="5" fill="#000000" />
														<rect x="82" y="27" width="10" height="5" fill="#000000" />
														<rect x="97" y="27" width="15" height="5" fill="#000000" />
														<rect x="117" y="27" width="5" height="5" fill="#000000" />
														<rect x="127" y="27" width="15" height="5" fill="#000000" />
														<rect x="147" y="27" width="5" height="5" fill="#000000" />
														<rect x="7" y="32" width="5" height="5" fill="#000000" />
														<rect x="37" y="32" width="5" height="5" fill="#000000" />
														<rect x="47" y="32" width="10" height="5" fill="#000000" />
														<rect x="62" y="32" width="25" height="5" fill="#000000" />
														<rect x="92" y="32" width="10" height="5" fill="#000000" />
														<rect x="107" y="32" width="5" height="5" fill="#000000" />
														<rect x="117" y="32" width="5" height="5" fill="#000000" />
														<rect x="147" y="32" width="5" height="5" fill="#000000" />
														<rect x="7" y="37" width="35" height="5" fill="#000000" />
														<rect x="47" y="37" width="5" height="5" fill="#000000" />
														<rect x="57" y="37" width="5" height="5" fill="#000000" />
														<rect x="67" y="37" width="5" height="5" fill="#000000" />
														<rect x="77" y="37" width="5" height="5" fill="#000000" />
														<rect x="87" y="37" width="5" height="5" fill="#000000" />
														<rect x="97" y="37" width="5" height="5" fill="#000000" />
														<rect x="107" y="37" width="5" height="5" fill="#000000" />
														<rect x="117" y="37" width="35" height="5" fill="#000000" />
														<rect x="52" y="42" width="15" height="5" fill="#000000" />
														<rect x="82" y="42" width="10" height="5" fill="#000000" />
														<rect x="97" y="42" width="15" height="5" fill="#000000" />
														<rect x="7" y="47" width="25" height="5" fill="#000000" />
														<rect x="37" y="47" width="20" height="5" fill="#000000" />
														<rect x="62" y="47" width="5" height="5" fill="#000000" />
														<rect x="82" y="47" width="15" height="5" fill="#000000" />
														<rect x="102" y="47" width="5" height="5" fill="#000000" />
														<rect x="112" y="47" width="5" height="5" fill="#000000" />
														<rect x="122" y="47" width="5" height="5" fill="#000000" />
														<rect x="132" y="47" width="5" height="5" fill="#000000" />
														<rect x="142" y="47" width="5" height="5" fill="#000000" />
														<rect x="7" y="52" width="5" height="5" fill="#000000" />
														<rect x="27" y="52" width="5" height="5" fill="#000000" />
														<rect x="47" y="52" width="5" height="5" fill="#000000" />
														<rect x="57" y="52" width="5" height="5" fill="#000000" />
														<rect x="67" y="52" width="10" height="5" fill="#000000" />
														<rect x="87" y="52" width="10" height="5" fill="#000000" />
														<rect x="102" y="52" width="35" height="5" fill="#000000" />
														<rect x="147" y="52" width="5" height="5" fill="#000000" />
														<rect x="17" y="57" width="10" height="5" fill="#000000" />
														<rect x="37" y="57" width="10" height="5" fill="#000000" />
														<rect x="57" y="57" width="5" height="5" fill="#000000" />
														<rect x="72" y="57" width="15" height="5" fill="#000000" />
														<rect x="97" y="57" width="5" height="5" fill="#000000" />
														<rect x="107" y="57" width="5" height="5" fill="#000000" />
														<rect x="122" y="57" width="15" height="5" fill="#000000" />
														<rect x="7" y="62" width="10" height="5" fill="#000000" />
														<rect x="22" y="62" width="5" height="5" fill="#000000" />
														<rect x="32" y="62" width="5" height="5" fill="#000000" />
														<rect x="47" y="62" width="5" height="5" fill="#000000" />
														<rect x="67" y="62" width="10" height="5" fill="#000000" />
														<rect x="82" y="62" width="5" height="5" fill="#000000" />
														<rect x="117" y="62" width="20" height="5" fill="#000000" />
														<rect x="147" y="62" width="5" height="5" fill="#000000" />
														<rect x="7" y="67" width="20" height="5" fill="#000000" />
														<rect x="37" y="67" width="5" height="5" fill="#000000" />
														<rect x="52" y="67" width="10" height="5" fill="#000000" />
														<rect x="67" y="67" width="5" height="5" fill="#000000" />
														<rect x="77" y="67" width="35" height="5" fill="#000000" />
														<rect x="122" y="67" width="5" height="5" fill="#000000" />
														<rect x="137" y="67" width="5" height="5" fill="#000000" />
														<rect x="147" y="67" width="5" height="5" fill="#000000" />
														<rect x="27" y="72" width="5" height="5" fill="#000000" />
														<rect x="42" y="72" width="15" height="5" fill="#000000" />
														<rect x="87" y="72" width="5" height="5" fill="#000000" />
														<rect x="97" y="72" width="40" height="5" fill="#000000" />
														<rect x="142" y="72" width="10" height="5" fill="#000000" />
														<rect x="7" y="77" width="5" height="5" fill="#000000" />
														<rect x="27" y="77" width="15" height="5" fill="#000000" />
														<rect x="47" y="77" width="5" height="5" fill="#000000" />
														<rect x="62" y="77" width="10" height="5" fill="#000000" />
														<rect x="82" y="77" width="10" height="5" fill="#000000" />
														<rect x="97" y="77" width="5" height="5" fill="#000000" />
														<rect x="112" y="77" width="15" height="5" fill="#000000" />
														<rect x="17" y="82" width="5" height="5" fill="#000000" />
														<rect x="42" y="82" width="5" height="5" fill="#000000" />
														<rect x="62" y="82" width="5" height="5" fill="#000000" />
														<rect x="77" y="82" width="10" height="5" fill="#000000" />
														<rect x="97" y="82" width="5" height="5" fill="#000000" />
														<rect x="112" y="82" width="5" height="5" fill="#000000" />
														<rect x="122" y="82" width="5" height="5" fill="#000000" />
														<rect x="132" y="82" width="5" height="5" fill="#000000" />
														<rect x="142" y="82" width="10" height="5" fill="#000000" />
														<rect x="27" y="87" width="5" height="5" fill="#000000" />
														<rect x="37" y="87" width="10" height="5" fill="#000000" />
														<rect x="62" y="87" width="5" height="5" fill="#000000" />
														<rect x="87" y="87" width="10" height="5" fill="#000000" />
														<rect x="137" y="87" width="10" height="5" fill="#000000" />
														<rect x="7" y="92" width="5" height="5" fill="#000000" />
														<rect x="22" y="92" width="15" height="5" fill="#000000" />
														<rect x="47" y="92" width="5" height="5" fill="#000000" />
														<rect x="57" y="92" width="5" height="5" fill="#000000" />
														<rect x="67" y="92" width="15" height="5" fill="#000000" />
														<rect x="87" y="92" width="5" height="5" fill="#000000" />
														<rect x="102" y="92" width="5" height="5" fill="#000000" />
														<rect x="117" y="92" width="25" height="5" fill="#000000" />
														<rect x="147" y="92" width="5" height="5" fill="#000000" />
														<rect x="7" y="97" width="5" height="5" fill="#000000" />
														<rect x="27" y="97" width="5" height="5" fill="#000000" />
														<rect x="37" y="97" width="5" height="5" fill="#000000" />
														<rect x="47" y="97" width="15" height="5" fill="#000000" />
														<rect x="72" y="97" width="15" height="5" fill="#000000" />
														<rect x="107" y="97" width="5" height="5" fill="#000000" />
														<rect x="7" y="102" width="5" height="5" fill="#000000" />
														<rect x="17" y="102" width="5" height="5" fill="#000000" />
														<rect x="32" y="102" width="5" height="5" fill="#000000" />
														<rect x="42" y="102" width="5" height="5" fill="#000000" />
														<rect x="52" y="102" width="5" height="5" fill="#000000" />
														<rect x="67" y="102" width="10" height="5" fill="#000000" />
														<rect x="97" y="102" width="20" height="5" fill="#000000" />
														<rect x="127" y="102" width="10" height="5" fill="#000000" />
														<rect x="142" y="102" width="5" height="5" fill="#000000" />
														<rect x="7" y="107" width="5" height="5" fill="#000000" />
														<rect x="17" y="107" width="5" height="5" fill="#000000" />
														<rect x="37" y="107" width="10" height="5" fill="#000000" />
														<rect x="67" y="107" width="5" height="5" fill="#000000" />
														<rect x="77" y="107" width="20" height="5" fill="#000000" />
														<rect x="102" y="107" width="45" height="5" fill="#000000" />
														<rect x="47" y="112" width="15" height="5" fill="#000000" />
														<rect x="87" y="112" width="15" height="5" fill="#000000" />
														<rect x="107" y="112" width="5" height="5" fill="#000000" />
														<rect x="127" y="112" width="5" height="5" fill="#000000" />
														<rect x="137" y="112" width="5" height="5" fill="#000000" />
														<rect x="7" y="117" width="35" height="5" fill="#000000" />
														<rect x="47" y="117" width="5" height="5" fill="#000000" />
														<rect x="57" y="117" width="15" height="5" fill="#000000" />
														<rect x="82" y="117" width="10" height="5" fill="#000000" />
														<rect x="97" y="117" width="15" height="5" fill="#000000" />
														<rect x="117" y="117" width="5" height="5" fill="#000000" />
														<rect x="127" y="117" width="10" height="5" fill="#000000" />
														<rect x="7" y="122" width="5" height="5" fill="#000000" />
														<rect x="37" y="122" width="5" height="5" fill="#000000" />
														<rect x="62" y="122" width="5" height="5" fill="#000000" />
														<rect x="77" y="122" width="5" height="5" fill="#000000" />
														<rect x="97" y="122" width="15" height="5" fill="#000000" />
														<rect x="127" y="122" width="5" height="5" fill="#000000" />
														<rect x="142" y="122" width="10" height="5" fill="#000000" />
														<rect x="7" y="127" width="5" height="5" fill="#000000" />
														<rect x="17" y="127" width="15" height="5" fill="#000000" />
														<rect x="37" y="127" width="5" height="5" fill="#000000" />
														<rect x="47" y="127" width="20" height="5" fill="#000000" />
														<rect x="82" y="127" width="5" height="5" fill="#000000" />
														<rect x="92" y="127" width="5" height="5" fill="#000000" />
														<rect x="107" y="127" width="25" height="5" fill="#000000" />
														<rect x="137" y="127" width="5" height="5" fill="#000000" />
														<rect x="7" y="132" width="5" height="5" fill="#000000" />
														<rect x="17" y="132" width="15" height="5" fill="#000000" />
														<rect x="37" y="132" width="5" height="5" fill="#000000" />
														<rect x="47" y="132" width="10" height="5" fill="#000000" />
														<rect x="67" y="132" width="25" height="5" fill="#000000" />
														<rect x="97" y="132" width="5" height="5" fill="#000000" />
														<rect x="112" y="132" width="5" height="5" fill="#000000" />
														<rect x="122" y="132" width="5" height="5" fill="#000000" />
														<rect x="142" y="132" width="10" height="5" fill="#000000" />
														<rect x="7" y="137" width="5" height="5" fill="#000000" />
														<rect x="17" y="137" width="15" height="5" fill="#000000" />
														<rect x="37" y="137" width="5" height="5" fill="#000000" />
														<rect x="47" y="137" width="10" height="5" fill="#000000" />
														<rect x="72" y="137" width="15" height="5" fill="#000000" />
														<rect x="102" y="137" width="5" height="5" fill="#000000" />
														<rect x="112" y="137" width="20" height="5" fill="#000000" />
														<rect x="142" y="137" width="5" height="5" fill="#000000" />
														<rect x="7" y="142" width="5" height="5" fill="#000000" />
														<rect x="37" y="142" width="5" height="5" fill="#000000" />
														<rect x="47" y="142" width="5" height="5" fill="#000000" />
														<rect x="57" y="142" width="5" height="5" fill="#000000" />
														<rect x="67" y="142" width="10" height="5" fill="#000000" />
														<rect x="82" y="142" width="5" height="5" fill="#000000" />
														<rect x="102" y="142" width="15" height="5" fill="#000000" />
														<rect x="132" y="142" width="5" height="5" fill="#000000" />
														<rect x="142" y="142" width="5" height="5" fill="#000000" />
														<rect x="7" y="147" width="35" height="5" fill="#000000" />
														<rect x="47" y="147" width="10" height="5" fill="#000000" />
														<rect x="67" y="147" width="5" height="5" fill="#000000" />
														<rect x="77" y="147" width="10" height="5" fill="#000000" />
														<rect x="92" y="147" width="15" height="5" fill="#000000" />
														<rect x="112" y="147" width="5" height="5" fill="#000000" />
														<rect x="127" y="147" width="5" height="5" fill="#000000" />
														<rect x="137" y="147" width="5" height="5" fill="#000000" />
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
					<xsl:apply-templates />
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
	<xsl:template match="invoice">
		<fo:block space-before="120pt" width="17cm" >
			<fo:table>
				<fo:table-column column-width="5.5cm"/>
				<fo:table-column column-width="5.5cm"/>
				<fo:table-column column-width="3cm"/>
				<fo:table-column column-width="3cm"/>
				<fo:table-body>
					<fo:table-row>
						<fo:table-cell>
							<fo:block>
								<fo:inline font-weight="bold">Bill To</fo:inline>
								<xsl:call-template name="address">
									<xsl:with-param name="address" select="./address[@type='billto']"></xsl:with-param>
								</xsl:call-template>
							</fo:block>
						</fo:table-cell>
						<fo:table-cell>
							<fo:block>
								<fo:inline font-weight="bold">Ship To</fo:inline>
								<xsl:call-template name="address">
									<xsl:with-param name="address" select="./address[@type='shipto']"></xsl:with-param>
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
								<xsl:value-of select="./invoicenumber"></xsl:value-of>&#x2028;
								<xsl:value-of select="./invoicedate"></xsl:value-of>&#x2028;
								<xsl:value-of select="./purchaseordernumber"></xsl:value-of>&#x2028;
								<xsl:value-of select="./duedate"></xsl:value-of>&#x2028;
							</fo:block>
						</fo:table-cell>
					</fo:table-row>
				</fo:table-body>
			</fo:table>
		</fo:block>
		<fo:block space-before="35pt">
			<fo:table line-height="30px">
				<fo:table-column column-width="2cm"/>
				<fo:table-column column-width="8cm"/>
				<fo:table-column column-width="3.5cm"/>
				<fo:table-column column-width="3.5cm"/>
				<fo:table-header>
					<fo:table-row background-color="#f5f5f5" text-align="center" font-weight="bold">
						<fo:table-cell border="1px solid #b8b6b6">
							<fo:block>QTY</fo:block>
						</fo:table-cell>
						<fo:table-cell border="1px solid #b8b6b6">
							<fo:block>DESCRIPTION</fo:block>
						</fo:table-cell>
						<fo:table-cell border="1px solid #b8b6b6">
							<fo:block>UNIT PRICE</fo:block>
						</fo:table-cell>
						<fo:table-cell border="1px solid #b8b6b6">
							<fo:block>AMOUNT</fo:block>
						</fo:table-cell>
					</fo:table-row>
				</fo:table-header>
				<fo:table-body>
					<xsl:apply-templates select="lineitems/lineitem"></xsl:apply-templates>
					<fo:table-row>
						<fo:table-cell number-columns-spanned="3" text-align="right" padding-right="3pt">
							<fo:block>Subtotal</fo:block>
						</fo:table-cell>
						<fo:table-cell  text-align="right" padding-right="3pt" border-left="1px solid #b8b6b6" border-right="1px solid #b8b6b6" >
							<fo:block>
								<xsl:value-of select="subtotal" />
							</fo:block>
						</fo:table-cell>
					</fo:table-row>
					<fo:table-row>
						<fo:table-cell number-columns-spanned="3" text-align="right" padding-right="3pt">
							<fo:block>
								Sales tax <xsl:value-of select="tax-percentage"/>%
							</fo:block>
						</fo:table-cell>
						<fo:table-cell  text-align="right" padding-right="3pt" border-left="1px solid #b8b6b6" border-right="1px solid #b8b6b6" >
							<fo:block font-family="Helvetica, SimSun">
								<xsl:value-of select="tax" />
							</fo:block>
						</fo:table-cell>
					</fo:table-row>
					<fo:table-row font-weight="bold">
						<fo:table-cell number-columns-spanned="3" text-align="right" padding-right="3pt">
							<fo:block>Total</fo:block>
						</fo:table-cell>
						<fo:table-cell  text-align="right" padding-right="3pt" background-color="#f5f5f5" border="1px solid #b8b6b6" >
							<fo:block>
								<xsl:value-of select="total" />
							</fo:block>
						</fo:table-cell>
					</fo:table-row>
				</fo:table-body>
			</fo:table>
		</fo:block>
	</xsl:template>
	<xsl:template name="address">
		<xsl:param name="address"></xsl:param>
		<fo:block>
			<xsl:value-of select="$address/name" />&#x2028;
			<xsl:value-of select="$address/street" />&#x2028;
			<xsl:value-of select="$address/zipcode" />&#160;<xsl:value-of select="$address/city" />
		</fo:block>
	</xsl:template>
	<xsl:template match="lineitem">
		<fo:table-row>
			<fo:table-cell border="1px solid #b8b6b6" text-align="center">
				<fo:block>
					<xsl:value-of select="quantity"/>
				</fo:block>
			</fo:table-cell>
			<fo:table-cell border="1px solid #b8b6b6" padding-left="3pt">
				<fo:block>
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
					<xsl:value-of select="amount"/>
				</fo:block>
			</fo:table-cell>
		</fo:table-row>

	</xsl:template>
</xsl:stylesheet>