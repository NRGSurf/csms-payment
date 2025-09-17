// pages/agb.tsx
import Head from "next/head";

export default function AgbPage() {
  return (
    <>
      <Head>
        <title>Allgemeine Geschäftsbedingungen (AGB)</title>
        <meta
          name="description"
          content="Allgemeine Geschäftsbedingungen (GTC) – be.ENERGISED / ChargePoint Austria GmbH"
        />
      </Head>

      <main className="mx-auto max-w-4xl p-6 prose prose-sm sm:prose lg:prose-lg">
        <h1>Allgemeine Geschäftsbedingungen (AGB)</h1>
        <h1>NEED TO BE UPDATED !!!!!</h1>

        <h2>General</h2>
        <p>
          These General Terms and Conditions (hereinafter &quot;GTC&quot;) apply
          to Charging Processes at a Charging Station operated with
          be.ENERGISED. be.ENERGISED is a brand of ChargePoint Austria GmbH
          (hereinafter &quot;ChargePoint&quot;). When a Charging Process is
          carried out, a contract is concluded between you and ChargePoint in
          accordance with the provisions of these GTC. The GTC apply
          exclusively. Any deviating terms and conditions are not accepted by
          ChargePoint and are hereby rejected. This does not affect any
          additional regulations of the Charging Station operator, property
          owner, parking space manager or other third parties that apply at the
          location of the Charging Station. For the compliance with these
          additional regulations you are solely responsible.
        </p>

        <h2>Information about your contract partner</h2>
        <p>
          ChargePoint Austria GmbH
          <br />
          Salzburger Straße 26
          <br />
          5550 Radstadt, Österreich
        </p>
        <p>
          Email:{" "}
          <a href="mailto:office-austria@chargepoint.com">
            office-austria@chargepoint.com
          </a>
          <br />
          Contact form:{" "}
          <a
            href="https://customer.chargepoint.com/beenergisedsupportcenter/s"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://customer.chargepoint.com/beenergisedsupportcenter/s
          </a>
          <br />
          CEO: Rebecca Maricela Chavez and Mansi Jimit Khetani
          <br />
          Register number: FN 399512 v<br />
          Register court: Landesgericht Salzburg
          <br />
          VAT-ID: ATU68066335
          <br />
          Object of the company: IT services
          <br />
          Supervisory Authority: District Administration St. Johann im Pongau
          (Bezirkshauptmannschaft St. Johann im Pongau)
          <br />
          Chamber affiliation: Salzburg Chamber of Commerce, Section Management
          Consultancy and Information Technology (Wirtschaftskammer Salzburg,
          Fachgruppe Unternehmensberatung und Informationstechnologie)
        </p>

        <h2>Definitions</h2>
        <p>
          be.ENERGISED is the software developed and operated by ChargePoint for
          the operation and billing of Charging Stations/Charging Processes.
          be.ENERGISED is a registered trademark of ChargePoint.
        </p>
        <p>
          EVSE-ID (Electric Vehicle Supply Equipment Identifier) is a unique
          alpha-numeric identifier of a Charging Point of a Charging Station.
        </p>
        <p>
          Charging Station is the totality of a technical facility (hardware and
          software) for charging electrically powered vehicles with electrical
          energy. A Charging Station has one or more Charging Points for
          connecting an electrically powered vehicle for the purpose of charging
          the batteries.
        </p>
        <p>
          Charging Process is the entire process of charging an electrically
          powered vehicle at a technically suitable Charging Point of a Charging
          Station, which is composed of various events. A Charging Process is
          defined in particular by a start and end time and by a meter start and
          end value. The start and end time determined by the Charging Station
          as well as the corresponding meter readings and the data relevant for
          allocation and billing are transmitted by the Charging Station to
          ChargePoint and processed by ChargePoint for the purpose of billing.
        </p>
        <p>
          Force Majeure means an event beyond the reasonable control of
          ChargePoint that prevents ChargePoint from performing its obligations
          under these GTC, including but not limited to natural disasters,
          extreme weather conditions, floods, lightning, explosions, fires,
          epidemics, pandemics, riots, war and military operations, national or
          local emergencies, acts or negligence of government, import, export or
          transit bans, economic disputes of any kind, strikes or other
          industrial action, cave-ins, disruption of transport or power
          networks, the reduced or non-functioning of third party networks,
          systems or equipment as well as any negligence of any person or entity
          beyond the reasonable control of ChargePoint.
        </p>
        <p>
          Mobile Payment Site means the website provided by ChargePoint via the
          Internet for the purpose of conducting a Charging Process and making
          cashless payment for a Charging Process at a Charging Station operated
          by be.ENERGISED. Via this website, you will be shown the tariff
          applicable at the respective Charging Point as well as a link to these
          GTC. Via the Mobile Payment Site you can start and pay for a Charging
          Process as described under point 5) of these GTC.
        </p>
        <p>
          A Consumer is anyone who carries out a Charging Process to charge a
          vehicle that is used for private purposes.
        </p>
        <p>
          Payment Terminal is a physical payment card reader or a physical
          device with a contactless function that can be used to read payment
          cards (credit or debit card). The Payment Terminal is operated in
          combination with be.ENERGISED, with ChargePoint acting as the billing
          party. The payment terminal can be integrated into the Charging
          Station or located as an external payment terminal near the Charging
          Station.
        </p>

        <h2>Subject matter</h2>
        <p>
          When a Charging Process is carried out at a Charging Station operated
          with be.ENERGISED, a contract is concluded between you and ChargePoint
          in accordance with the provisions of these GTC and you will therefore
          receive an invoice for the Charging Process exclusively from
          ChargePoint after completion of the Charging Process.
        </p>
        <p>
          The subject of this contract is the execution, cashless payment and
          electronic billing of a Charging Process at a Charging Station
          operated with be.ENERGISED, including the supply (in the meaning of
          VAT law) of the charged electricity.
        </p>
        <p>
          It is noted that this contract does not constitute a continuing
          obligation. This means that you do not enter into a long-term contract
          or subscription and you are not obliged to purchase certain minimum
          quantities. You are obliged to pay ChargePoint in full for the
          Charging Process you have carried out in accordance with the
          provisions of these GTC. This contract ends automatically when the
          Charging Process has been completed and paid for in full.
        </p>
        <p>
          This contract does not cover any additional charges incurred at the
          location of the Charging Station or any additional, ancillary or other
          third party services actually consumed by you in the course of
          carrying out the Charging Process. See also point 7) of these GTC.
        </p>

        <h2>How to perform a Charging Process via the Mobile Payment Site</h2>
        <p>
          At the Charging Stations operated with be.ENERGISED, a QR code sticker
          is attached to each Charging Point, which, in addition to the QR code,
          also contains the be.ENERGISED logo and the EVSE-ID of the respective
          Charging Point.
        </p>
        <p>
          Scanning a QR code with your mobile phone takes you to the Mobile
          Payment Site, where you can view the tariff applicable at the
          respective Charging Point and pay for and thereby start a Charging
          Process. To scan a QR code, you may need a suitable app. The Mobile
          Payment Site is available in various languages.
        </p>
        <p>
          On the Mobile Payment Site, you will first be shown the tariff
          applicable at the respective Charging Point as well as links to these
          GTC including the Privacy Policy. In order for ChargePoint to be able
          to fulfil its disclosure and information obligations towards you in
          accordance with Directive 2000/31/EC and Directive 2011/83/EU and to
          send you the invoice for the Charging Process you have carried out as
          well as these GTC, it is mandatory to enter your email address.
        </p>
        <p>
          After entering your email address and ticking two boxes, by which you
          on the one hand expressly declare your unconditional consent to the
          displayed tariff and to these GTC and on the other hand declare your
          express request to ChargePoint that ChargePoint should begin providing
          the service before the expiry of the period for exercising the right
          of withdrawal to which you are entitled as a Consumer, you will be
          taken to the selection of available payment providers by clicking on
          the corresponding button.
        </p>
        <p>
          After selecting your desired payment provider and then filling in all
          the fields displayed, click on the &quot;Pay&quot; button; the
          Charging Process starts automatically after the payment process has
          been completed, provided the car is connected to the Charging Station.
        </p>
        <p>
          Clicking on Stop or disconnecting the car from the Charging Point ends
          the Charging Process and an invoice is then sent to the email address
          provided by you.
        </p>

        <h2>How to perform a Charging Process via the Payment Terminal</h2>
        <p>
          If a Payment Terminal is installed in the Charging Station or near the
          Charging Station, payment can be made using a standard credit or debit
          card. Payment using a debit card without a co-badge is not possible.
          You can select the desired Charging Point at the Payment Terminal and
          view the tariff that is applicable at the respective Charging Point.
          By starting a Charging Process via the Payment Terminal, you declare
          your unconditional consent to the tariff displayed and to these GTC on
          the one hand and, on the other hand, you declare your express request
          that ChargePoint should start providing the service before the period
          for exercising the right of withdrawal - to which you are entitled as
          a consumer - has expired. The Charging Process ends when you stop the
          Charging Process via the Payment Terminal or at your vehicle. You can
          obtain an invoice by scanning the invoice QR code shown on the Payment
          Terminal.
        </p>

        <h2>Offer and acceptance</h2>
        <p>
          The information provided by ChargePoint via the Mobile Payment Site or
          the Payment Terminal does not constitute a binding offer to conclude a
          contract, but by clicking on the &quot;Pay&quot;/&quot;Start&quot;
          button you in turn make a binding offer to conclude a contract.
          Acceptance by ChargePoint is implied by the start of the Charging
          Process, whereby the contract between you and ChargePoint is
          concluded.
        </p>

        <h2>Tarifs and additional costs</h2>
        <p>
          The tariff displayed on the Mobile Payment Site may consist of either
          a price per kilowatt hour (kWh), a price per minute or per defined
          period of time, a flat rate per Charging Process or a combination
          thereof. Unless expressly stated otherwise, all prices are always
          inclusive of the VAT applicable at the location of the Charging
          Station and in the national currency applicable at the location of the
          Charging Station.
        </p>
        <p>
          It is noted that in the case of a tariff consisting (at least in part)
          of a price per kWh or a price per minute, the actual total cost of the
          Charging Process cannot be calculated and displayed in advance, as
          this depends on the actual amount of energy charged or the actual
          duration of the Charging Process. By agreeing to these GTC, you hereby
          expressly declare your consent hereto.
        </p>
        <p>
          It is also noted that any additional fees or charges incurred at the
          location of the Charging Station for additional, ancillary or other
          services of third parties actually consumed by you in the course of
          the Charging Process are not included in the tariff displayed on the
          Mobile Payment Site. Additional costs may be incurred in particular
          for Internet use in connection with access to the Mobile Payment Site
          vis-à-vis your mobile operators and for parking your vehicle during
          the Charging Process vis-à-vis property owners or parking space
          managers at the location of the Charging Station. ChargePoint has no
          influence on the occurrence and the amount of such additional costs.
          You are solely responsible for informing yourself about any additional
          costs and paying them to the respective prescribing bodies. By
          agreeing to these GTC, you expressly declare your consent hereto.
        </p>

        <h2>Payment providers, payment processing and payment reservation</h2>
        <p>
          Only the payment providers or cashless payment methods available on
          the Mobile Payment Site or Payment Terminal are accepted. In
          connection with the payment processing, additional conditions of your
          payment provider may apply, over which ChargePoint has no influence.
        </p>
        <p>
          Depending on the payment provider, ChargePoint will either reserve an
          amount of up to EUR 80.00 or an equivalent amount in the national
          currency applicable at the location of the Charging Station on your
          means of payment or debit the respective amount as security. You are
          responsible for ensuring that the means of payment you have provided
          is valid, unblocked and has sufficient funds.
        </p>
        <p>
          In the event that the actual total cost of the Charging Process is
          less than the amount reserved on your payment instrument or debited as
          security, the difference will be released or credited back to your
          payment means immediately after the successful completion of the
          Charging Process, but no later than within thirty (30) calendar days.
          In the event that the actual total cost of the Charging Process
          exceeds the amount reserved on your payment means or debited as
          security, the excess amount is due for payment immediately upon
          receipt of the invoice.
        </p>
        <p>
          Charging Processes lasting less than two (2) minutes or falling below
          0.1 kWh are considered faulty and will therefore not be charged. In
          this case, the entire amount reserved on your means of payment or
          debited as security will be released again on your means of payment or
          charged back immediately, at the latest, however, within thirty (30)
          calendar days.
        </p>

        <h2>Billing, payment, late payment and complaints</h2>
        <p>
          After successful completion of the Charging Process, you will receive
          an invoice for the actual total costs of the Charging Process from
          ChargePoint in English language. Invoices will only be sent
          electronically to the email address provided by you or – when using a
          Payment Terminal – may be downloaded via a website that can be
          accessed by scanning the QR code shown on the Payment Terminal.
          Therefore, there is a rebuttable presumption that the invoice date
          corresponds to the date of delivery. By agreeing to these GTC, you
          expressly agree hereto.
        </p>
        <p>
          You are obliged towards ChargePoint to pay in full for the Charging
          Process carried out by you in accordance with the provisions of these
          GTC. If your means of payment is invalid or blocked, or if there is a
          shortage of funds, or if you or your payment provider subsequently
          cancel a payment transaction, ChargePoint is entitled to compensation
          for payment of the actual total costs of the Charging Process as shown
          on the invoice plus any bank charges actually incurred. In these
          cases, the invoice date corresponds to the due date and ChargePoint is
          therefore entitled to charge you interest on arrears of 4% p.a. from
          the invoice date.
        </p>
        <p>
          If the Charging Station supports this, you can retrieve the signed
          measurement data for your Charging Process via the link{" "}
          <a
            href="https://ladevorgang.download/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ladevorgang.download/
          </a>{" "}
          , stating the invoice number and the Charging Process date, in order
          to subsequently be able to check its correctness, e.g. with the help
          of transparency software.
        </p>

        <h2>Your other obligations</h2>
        <p>
          You are required to provide all information on the Mobile Payment Site
          truthfully and completely and acknowledge that the information
          provided by you cannot be corrected on the invoice by ChargePoint once
          the Charging Process has been completed. If the information you
          provide is false or incomplete, we may not be able to provide you with
          the legally required information and invoice for the Charging Process
          you have completed. In such cases, you expressly waive your right to
          the post-contractual provision of the legally required information on
          a durable medium and the transmission of the invoice for the Charging
          Process you have carried out. Your obligation to pay in full for the
          Charging Process you have carried out in accordance with the
          provisions of these GTC remains unaffected.
        </p>
        <p>
          It is solely within your responsibility to select a Charging Station
          or Charging Point with the appropriate plug format for your vehicle
          for the Charging Process. Not all Charging Stations or Charging Points
          are compatible with all vehicles.
        </p>
        <p>
          A defective or obviously damaged Charging Station must not be used.
          This may result in damage to your vehicle or personal injury. The same
          applies if the Charging Station displays an error message. Damage or
          error messages must be reported immediately to the Charging Station
          operator or any personnel present.
        </p>
        <p>
          Charging Stations must always be used carefully and gently and in
          accordance with any operating instructions provided at the location of
          the Charging Station or in accordance with the instructions of any
          personnel of the Charging Station operator present. Any damage, in
          particular due to improper operation or use of incompatible plug
          formats, must be avoided.
        </p>
        <p>
          You are also obliged to inform yourself about any additional
          prescriptions or regulations applicable at the location of the
          Charging Station, in particular operating instructions, road traffic
          and parking regulations as well as house or garage regulations, and to
          comply with them.
        </p>
        <p>
          Subject to any deviating regulations applicable at the location of the
          Charging Station, you must remove your vehicle from the Charging
          Station immediately after completion of the Charging Process in order
          to free up the associated parking area for third parties.
        </p>

        <h2>Limitations of warranty and liability</h2>
        <p>
          ChargePoint contractually obliges the Charging Station operators to
          maintain and repair the Charging Stations operated with be.ENERGISED
          and to ensure safe access and use of these Charging Stations.
        </p>
        <p>
          However, ChargePoint does not guarantee and is not liable for the
          availability or functionality of individual Charging Stations at all
          times and without interruption. This applies in particular to the
          performance of necessary maintenance and repair work as well as to
          disruptions, failures or damage to the Charging Station or the
          networks, obstructions to access to the Charging Station or events of
          force majeure that are beyond the sphere or control of ChargePoint.
        </p>
        <p>
          However, ChargePoint does not guarantee and is not liable for a
          specific charging power of individual Charging Stations or individual
          Charging Points. In particular, if several Charging Points of a
          Charging Station are used simultaneously by several vehicles, the
          charging capacity of the individual Charging Point may be reduced for
          technical reasons. In addition, ChargePoint is entitled to adjust or
          completely suspend the charging capacity of individual Charging
          Stations or individual Charging Points according to the currently
          available total capacity of the grid connection.
        </p>
        <p>
          Subject to the foregoing, the general statutory warranty provisions
          apply to Consumers with regard to the correct billing of the Charging
          Process.
        </p>
        <p>
          Furthermore, the liability of ChargePoint for damages resulting from
          slight negligence is excluded The aforementioned limitations of
          liability do not apply to personal injury. Furthermore, the
          aforementioned limitations of liability do not apply to Consumers for
          damages resulting from a breach of material contractual obligations.
        </p>
        <p>
          Insofar as the liability of ChargePoint is excluded or limited
          according to the above provisions, this also applies to its managing
          directors, executive employees, (freelance) employees, representatives
          and other vicarious agents.
        </p>

        <h2>
          Right of withdrawal of Consumers when using the Mobile Payment Site
        </h2>
        <p>
          If you are a Consumer, you have the right to withdraw from distance
          and off-premises contracts within fourteen (14) calendar days from the
          date of conclusion of the contract (Withdrawal Period) without giving
          any reason. To exercise your right of withdrawal, you must notify
          ChargePoint of your decision to withdraw from the contract concluded
          with ChargePoint by means of a clear declaration. For this purpose,
          you can use the cancellation form contained in Appendix A of these
          GTC. It is sufficient to send the declaration of withdrawal within the
          Withdrawal Period.
        </p>
        <p>
          If you withdraw from the contract, ChargePoint shall immediately, but
          no later than fourteen (14) days after the day on which ChargePoint
          receives your declaration of withdrawal, refund to you all payments
          already received from you, whereby ChargePoint shall use the same
          means of payment for the repayment as you used for the payment
          transaction. However, the following exceptions apply:
        </p>
        <p>
          If the Charging Process is considered a service or a supply of
          electricity not offered for sale in a limited volume or a set quantity
          under the law of the country in which you have your habitual
          residence, then, by ticking the appropriate box on the Mobile Payment
          Site, you expressly request that ChargePoint should already start
          providing the service or supply before the expiry of the withdrawal
          period and you confirm that you are not entitled to a right of
          withdrawal for the services actually consumed by you (performance of
          the Charging Process including the supply of electricity until the
          successful completion of the Charging Process) and that ChargePoint is
          entitled to payment for the service actually provided to you (Article
          14 para. 3 Directive 2011/83/EU).
        </p>
        <p>
          In addition, if the Charging Process is considered a service under the
          law of the country in which you have your habitual residence, you do
          not have a right of withdrawal if ChargePoint, due to your express
          request in accordance with the preceding paragraph, has started the
          service before the expiry of the withdrawal period and has provided
          the service in full, i.e. after the successful completion of the
          Charging Process (Article 16 lit. a Directive 2011/83/EU).
        </p>
        <p>
          If the Charging Process is considered a supply of electricity (goods)
          offered for sale in a limited volume or a set quantity under the law
          of the state in which you have your habitual residence, you do not
          have a right of withdrawal (Article 2 para. 3 and Article 16 lit. f
          Directive 2011/83/EU).
        </p>

        <h2>Online Dispute Resolution for Consumers</h2>
        <p>
          If you are a Consumer, you have the possibility to submit complaints
          to the Online Dispute Resolution Platform of the European Commission.
          This can be accessed at the following link:{" "}
          <a
            href="https://ec.europa.eu/odr"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/odr
          </a>
          . The Online Dispute Resolution Platform can be used to settle
          extrajudicially any disputes arising from a contract concluded with
          ChargePoint. ChargePoint is not obliged to participate in such an
          extrajudicial dispute resolution procedure.
        </p>
        <p>
          You can also send your suggestions or complaints directly to
          ChargePoint. To do so, send an email to{" "}
          <a href="mailto:office-austria@chargepoint.com">
            office-austria@chargepoint.com
          </a>{" "}
          or contact ChargePoint using the contact form provided at{" "}
          <a
            href="https://customer.chargepoint.com/beenergisedsupportcenter/s"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://customer.chargepoint.com/beenergisedsupportcenter/s
          </a>
          .
        </p>

        <h2>Data protection</h2>
        <p>
          ChargePoint processes the personal data provided by you (email address
          and any other information you provide) solely for the purpose of
          fulfilling this contract, i.e. for carrying out and processing the
          cashless payment and electronic billing of a Charging Process at a
          Charging Station operated with be.ENERGISED. ChargePoint will not use
          your personal data for purposes other than those stated.
        </p>
        <p>
          The processing of personal data by ChargePoint is carried out on the
          basis of the applicable data protection regulations, in particular in
          accordance with GDPR.
        </p>
        <p>
          The detailed data protection information (Privacy Policy) pursuant to
          Article 13 et seq. GDPR can be found in the Privacy Policy on the use
          of our Mobile Payment Site (Appendix B).
        </p>

        <h2>Applicable law</h2>
        <p>
          These GTC shall be governed by Austrian substantive law excluding its
          conflict of law rules as well as the UN Convention on Contracts for
          the International Sale of Goods (CISG). If you are a Consumer, this
          choice of law shall only apply insofar as it does not restrict any
          mandatory statutory provisions of the state in which you have your
          habitual residence.
        </p>

        <h2>Place of jurisdiction</h2>
        <p>
          The place of jurisdiction for all disputes arising from or in
          connection with these GTC is the court at the registered office of
          ChargePoint that is competent according to the amount in dispute.
          Vis-à-vis Consumers the statutory places of jurisdiction apply.
        </p>

        <h2>Notifications</h2>
        <p>
          You must either send notifications in writing to the address stated in
          point 2) of these GTC or submit them using the contact form provided
          at{" "}
          <a
            href="https://customer.chargepoint.com/beenergisedsupportcenter/s"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://customer.chargepoint.com/beenergisedsupportcenter/s
          </a>
          . Written notices shall be deemed to have been sent in due time if
          they are posted before expiry of the respective deadline (date of
          postmark). For notices submitted via the contact form, the time of
          sending the contact form shall apply.
        </p>

        <h2>Provision of and amendments to these GTCs</h2>
        <p>
          The current version of these GTC is placed on the Mobile Payment Site
          and will be sent to the email address you have provided, after
          successful completion of the loading process. In addition, you can
          access this version and older versions of these GTC at any time via
          our website{" "}
          <a
            href="https://www.chargepoint.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.chargepoint.com/
          </a>
          .
        </p>

        <h2>Severability clause</h2>
        <p>
          Should a provision of these GTC be or become invalid due to mandatory
          legal regulations, the validity of all other provisions shall not be
          affected. With respect to Consumers, the statutory provision shall
          apply in place of the invalid provision.
        </p>

        <p className="mt-8">
          <strong>Version: 09.2025</strong>
        </p>

        <hr />

        <p>
          1 Directive 2000/31/EC of the European Parliament and of the Council
          of 8 June 2000 on certain legal aspects of information society
          services, in particular electronic commerce, in the Internal Market
          (&#34;Directive on electronic commerce&#34;)
        </p>
        <p>
          2 Directive 2011/83/EU of the European Parliament and of the Council
          of 25 October 2011 on Consumer rights, amending Council Directive
          93/13/EEC and Directive 1999/44/EC of the European Parliament and of
          the Council and repealing Council Directive 85/577/EEC and Directive
          97/7/EC of the European Parliament and of the Council (‘Directive on
          Consumer rights’)
        </p>
        <p>
          3 Regulation (EU) 2016/679 of the European Parliament and of the
          Council of 27 April 2016 on the protection of natural persons with
          regard to the processing of personal data and on the free movement of
          such data, and repealing Directive 95/46/EC (General Data Protection
          Regulation)
        </p>
      </main>
    </>
  );
}
