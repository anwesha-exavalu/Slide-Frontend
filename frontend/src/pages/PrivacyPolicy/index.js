import { Col, Row } from "antd";
import React from "react";
import { Container } from "styles/components/Layout";
import { PrivacyContainer, PrivacyContent } from "styles/pages/PrivacyPolicy";
import PrivacyImage from "assets/svg/privacybanner.svg";

const PrivacyPolicy = () => {
  return (
    <div>
      <PrivacyContainer>
        <Container>
          <Row>
            <Col span={12} className="privacy-card">
              <h4 className="title">Privacy</h4>
              <p className="subtext">
                Effective Date:September 9, 2024
                <br /><br />
                Version 2.0
              </p>
            </Col>
            <Col span={12}>
              <div className="privacyimage">
                <img src={PrivacyImage} />
              </div>
            </Col>
          </Row>
        </Container>
      </PrivacyContainer>
      <PrivacyContent>
        <Container>
          <h5 className="heading">Privacy Policy</h5>
          <p className="content">
          Exavalu is a Strategic Partner to some of the most recognized brands and Industry leaders today. We also partner with emerging digital 
          players that are fast disrupting traditional industries. 
          We partner with our clients closely to deliver meaningful change and lasting impact. Our seasoned Industry veterans are 
          experienced in solving your most challenging problems.

          We focus on providing executive advisory on a wide range of strategic business and technology opportunity areas, 
          including digital transformation and the effective delivery of solutions and Services that help our clients to realize Value. 
          We remain with our clients until they achieve the desired results.

          </p>
          {/*<p className="content">
            At Exavalu Insurance we are dedicated to protecting your privacy.
            We understand that you value your privacy, and that you may have questions
            about how we use the data collected through our Exavalu Insurance Platform.
            This Privacy Notice applies to information we obtain about you in the course
            of providing access to and use of the Exavalu Insurance Platform.
          </p>
          <p className="content">
            By using or accessing the Exavalu Insurance Platform, you (a)
            accept how we may collect, use, disclose and otherwise handle your information,
            as we specifically describe in this Privacy Notice, and (b) represent and
            warrant that you have the right, authority, and capacity to accept these conditions.
            By using or accessing the Exavalu Insurance Platform, you also accept the Terms of Use.
            You may not access or use the Exavalu Insurance Platform if you have not reached the
            age of majority in your state of residence. Specifically, if you are under the age 13,
            do not access or use the Exavalu Insurance Platform and do not enter any personally
            identifiable information about you or anyone under the age of 13 into the Exavalu
            Insurance Platform. If you do not agree with all of the conditions of this Privacy
            Notice or Terms of Use, do not access and/or use the Exavalu Insurance Platform.
            If you are accepting on behalf of a company or other third party, you represent
            and warrant that you have full authority to act for and to bind that company or
            other party, in which case the term {`"you"`} refers to that company or other party.
          </p>
          <h5 className="sub-heading">
            1. Information We Collect
          </h5>
          <p className="content">
            In connection with the provision of the Exavalu Insurance Platform,
            we obtain information about you, such as:
            <br />
            <br />
            <ul>
              <li>
                Contact and identification information, such as: name, surname, address, unique personal
                identifiers, email address, account username and password, telephone number,
                insurance policy number, account name, social security number, signature,
                gender, {`driver's`} license number, physical characteristics, consumer status,
                and other similar identifiers.
              </li>
              <br />
              <li>
                Driving and claims history, including information about any prior accidents or insurance claims.
              </li>
              <br />
              <li>
                Vehicle information, such as a vehicle identification number (VIN),
                plate number and other vehicle details.
              </li>
              <br />
              <li>
                Financial identifiers, such as a bank account number, credit card number,
                debit card number, or other financial information.
              </li>
              <br />
              <li>
                Medical information, such as details involving the injuries sustained in a
                car accident, as well as health insurance information.
              </li>
              <br />
              <li>
                Commercial information about consumer transactions and experiences with us
                and others, such as payment history, claims, coverage and vehicle changes.
              </li>
              <br />
              <li>
                Website and app usage and device information, such as search and browsing history,
                online identifier(s), Internet Protocol address, search history, and information
                regarding how users interact with our websites, apps, and online advertisements or cookies.
              </li>
              <br />
              <li>
                Location data. We may also collect information from their device about their physical
                location so we can provide services like finding a nearby POI.
              </li>
              <br />
              <li>
                Audio, electronic, visual, or similar information, such as recorded statements,
                photos of damaged vehicles, videos of accident locations, and calls made to our
                customer service centers, which may be recorded.
              </li>
              <br />
              <li>
                Professional or employment-related information in the form of business contact
                information and education or employment history, which we only use as permitted by law.
              </li>
              <br />
              <li>
                Ownership data, such as: How many vehicles you own, Primary use, Who owns the car
                (whether {`it's`} you, or your company for example), Who is (or will be) the registered
                keeper, When the car was bought, Your rough annual mileage.
              </li>
              <br />
              <li>
                Characteristics of protected data subjects under California or federal law such as Age,
                race, national origin, citizenship, religion, marital status, medical condition,
                physical or mental disability, sex (including gender, gender identity, gender expression,
                pregnancy or childbirth and related medical conditions), sexual orientation, veteran or
                military status, genetic information.
              </li>
            </ul>
          </p>
          <p className="content">
            Through the Exavalu Insurance Platform, we and our third-party, marketing partners may also
            obtain other information relating to you, such as your operating system, your phone carrier,
            hardware you use, pages you viewed, your IP address, how often you use the Exavalu Insurance
            Platform, events that occur within the Exavalu Insurance Platform during your use,
            aggregated-usage information, performance data, the site and location from where you
            downloaded or otherwise accessed the Exavalu Insurance Platform, your browser type, your
            Internet service provider, the referring and exit pages, installed fonts, device IDs,
            language and time zone settings, and other information relating to your use of or access
            to the Exavalu Insurance Platform. We and our third-party marketing partners may also use in
            the Exavalu Insurance Platform web beacons, clear gifs, pixel tags, local shared objects,
            and similar technologies to collect information relating to your use of or access to
            products and services offered through the Exavalu Insurance Platform. In addition, the Exavalu
            Insurance Platform uses remarketing services to advertise on third party websites to
            previous visitors of the Exavalu Insurance Platform. For example, we may direct advertising
            (in the form of an advertisement on a search results page or other website) to a user
            who previously visited the Exavalu Insurance Platform, but {`didn’t`} complete a task on our
            site, such as partially completing a contact form. The use of these remarketing services
            enables Exavalu to tailor offers to and communicate about our services with individuals who
            have shown interest in our products.
          </p>
          <p className="content">
            Additionally, we will also collect Information and data according to our Telematics Policy
            available on <a href='https://www.exavalu.com/privacy-pledge' target="_blank" rel="noopener noreferrer">
              https://www.exavalu.com/privacy-pledge</a>, when you visit our website or by
            third party vendors that may use cookies to serve advertisements based on an {`individual’s`}
            past visit to our website. You can find more details regarding Cookies and the way we use them,
            by consulting our Cookies Policy.
          </p><br/>
          <h5 className="sub-heading">
            2. Where Do We Get Your Data From
          </h5>

          <p className="content">
            We may obtain your personal data: <br /><br />
            <ul>
              <li>
                <b>Directly from you.</b> i.e. when (i) you apply for insurance, (ii) you or other users use or
                access the Exavalu Insurance Platform (iii) when you directly provide us with the information,
                either in writing (e.g., by filling out a form) or verbally (e.g., as a result of your
                telephone conversation) or (iv) by examining the interaction we have with you. For example,
                we will obtain your personal data when: (i) you buy any of our services, (ii) you enter into
                a service contract with us, (iii) you subscribe to receive commercial communications or
                other offers and information from us or our partners, (iv) you contact us through various
                channels or request information / offers regarding a service; (vi) visit or browse our
                Website.
              </li>
              <br />
              <li>
                <b>From sources other than directly from you.</b> Such third parties may include
                government authorities, consumer reporting agencies, doctors or hospitals, insurance
                agencies, claims adjusters, actuarial data providers, and business partners who support
                our business. The information we may receive from third party providers, as consumer
                reporting agencies are referring to vehicle reports, claim reports, and/or credit
                information where permitted by law. When you ask for a rate quotation, we may obtain
                credit information if permitted by applicable state law. Our sales and service
                representatives do not have access to the details of your credit information. Our inquiry
                will not affect your credit score or credit rating. If you are purchasing a commercial
                policy, we may also confirm the motor vehicle records of the employees you will have
                driving on your {`company's`} behalf.
              </li>
            </ul>
          </p>
          <p className="content">
            If you {`“opt-in”`} for the collection of telematics information for the safety score, we
            will obtain additional information about you and your driving patterns as more fully described
            in the Telematics Policy. Please note that we may work with an affiliated or unaffiliated third
            party to provide driver scoring and your data will be shared with the third party for use
            solely in connection with providing the driver scoring to Exavalu. Furthermore, if you {`“opt-in”`}
            for the collection of telematics information, we collect additional information about you and any
            crash events involving your vehicle. Unless otherwise required by applicable law, we will only
            share this information with the insurance company and/or a third party claims administration
            partner. Full details can be found in our Telematics Policy, following the link above.
          </p>
          <p className="content">
            In connection with your initial insurance application or later renewal of insurance, we may,
            to the extent permitted by law and with your consent, review your credit report or obtain or
            use a credit-based insurance score, based on information contained in your credit report.
            An insurance score uses information from your credit report to help predict how often you
            are likely to file claims and how expensive those claims will be. We may rely on third
            parties to develop and provide such insurance scores. Typical items from a credit report
            that could affect an insurance score {`– `}and, thus, the scope or price of insurance we may
            make available to you - include, but are not limited to, payment history, number of revolving
            accounts, number of new accounts, the presence of collection accounts, bankruptcies and
            foreclosures. The information used to develop the insurance score comes from various credit
            reporting agencies. If we take an adverse action based on information contained in your credit
            report {`–`} such as declining to make insurance available to you or adjusting the scope or price
            based, in whole or in part, on the insurance score, we will:
          </p>
          <p className="content">
            <ul>
              <li>
                Provide you with the name, address and phone number of the credit reporting
                agency that supplied the report;
              </li>
              <br />
              <li>
                A statement that the credit reporting agency did not make the adverse
                decision and cannot explain why the decision was made;
              </li>
              <br />
              <li>
                Inform you of your right to obtain a free copy of the credit reporting
                {`agency’s`} report if requested within sixty (60) days;
              </li>
              <br />
              <li>
                Notify you of your right to dispute the accuracy or completeness of
                information provided by the credit reporting agency; and
              </li>
              <br />
              <li>
                Inform you of your credit score, if a score was used.
              </li>
              
            </ul>
          </p><br/>
          <h5 className="sub-heading">3. How Do We Use Your Personal Information</h5>
          <p className="content">
            We may use the information we obtain in connection with the following activities
            (including those provided by our partners) and based on the following legal grounds:
            <br /><br />
            <ul>
              <li>
                For underwriting and rate purposes, including verification of information
                provided by you or with your consent;
              </li>
              <br />
              <li>
                Carrying out business-related services, which includes processing applications or
                facilitating claims/requests or conducting investigations, executing transactions,
                and maintaining or servicing customer accounts;
              </li>
              <br />
              <li>
                To calculate your driver score, which, along with other traditional rating factors,
                determines your insurance quote, the rate you will pay for your current policy or
                when your policy renews, or pricing for a future policy;
              </li>
              <br />
              <li>
                To understand how to interact with the Exavalu Insurance Platform, so that we can
                continue to improve the experience, quality, security and reliability;
              </li>
              <br />
              <li>
                To respond to your customer service requests or the requests of others who may be covered,
                administer your account, send you service-related correspondence, permit you to add
                individuals or an account or policy, fulfill an insurance related transaction, process
                insurance claims, participate in insurance support organizations, underwrite and rate
                policies and accounts, confirm your identity, communicate with you, and to otherwise
                provide access to the Exavalu Insurance Platform;
              </li>
              <br />
              <li>
                To send you newsletters, evaluate marketing campaigns, develop new products and services,
                market our products and services, analyze how users use the Exavalu Insurance Platform, send
                you notifications, and provide a more customized web or mobile experience;
              </li>
              <br />
              <li>
                To facilitate auditing, prevent or investigate fraud, comply with requests from regulatory
                and law enforcement authorities, protect our rights, protect your safety or the safety of
                others, comply with applicable law, respond to subpoena or court order, and otherwise
                investigate, establish, exercise, and defend legal rights;
              </li>
              <br />
              <li>
                To establish or defend legal claims and allegations.
              </li>
              <br />
              <li>
                Identifying and preventing security incidents, and safeguarding against malicious,
                deceptive, fraudulent, or illegal activities, including money laundering, terrorism,
                and other criminal acts.
              </li>
              <br />
              <li>
                Debugging to detect and fix errors that hinder the proper functioning of existing systems;
              </li>
              <br />
              <li>
                Conducting internal research to drive technological advancement, which includes exploring
                innovative solutions, enhancing current technologies, and developing cutting-edge products
                and services;
              </li>
              <br />
              <li>
                To facilitate any other activity in connection with the creation, development, offering,
                provision, or servicing of our products and services;and
              </li>
              <br />
              <li>
                To conduct any other legitimate business activities not otherwise prohibited by law.
              </li>
              <br />
            </ul>
          </p>
          <p className="content">
            We will only process your personal information for specific, lawful purposes directly related to
            providing you with the services you have requested, such as: <br /><br />
            <ul>
              <li>
                Our legitimate interest in promoting road safety, preventing accidents or product
                development, reducing insurance claims, and enhancing customer loyalty through
                personalized services, while balancing the {`individual's`} interest in privacy and
                data protection; We process your data based on our legitimate interest in fulfilling
                contractual obligations, preventing fraudulent claims to protect Exavalu from eventual
                financial loss;
              </li>
              <br />
              <li>
                Contractual necessity to fulfill insurance obligations;
              </li>
              <br />
              <li>
                Your consent to collect and process telematics data and implied/derived data;
                such telematics data is predicated upon explicit and informed customer consent,
                enabling Exavalu to refine risk assessment for potentially tailored premium structures;
              </li>
              <br />
              <li>
                Our legal obligation to adhere to insurance regulations, authorities requests
                and other legal requirements.
              </li>
            </ul>
          </p><br/>
          <h5 className="sub-heading">
            4. How We Share Information
          </h5>
          <p className="content">
            We may share the information we obtain from you with third parties,
            such as our partners, in connection with the following activities:
            <br /><br />
            <ul>
              <li>
                <b>With your consent:</b> For any purpose to which you expressly consent;
              </li>
              <br />
              <li>
                <b>Business Transactions:</b> To facilitate a merger, acquisition, bankruptcy,
                dissolution, reorganization, sale of some or all of our assets, financing, acquisition
                of all or a portion of our business, a similar transaction or proceeding, or steps in
                contemplation of such activities (e.g., due diligence); and
              </li>
              <br />
              <li>
                <b>Legitimate Business Activities:</b>  To conduct any other legitimate business
                activities not otherwise prohibited by law, or with your consent.
              </li>
            </ul>
          </p>
          <p className="content">
            Legal obligation: In addition, we reserve the right to access, read, preserve, and disclose
            any information as we reasonably believe is necessary to: (i) satisfy any applicable law,
            regulation, legal process, subpoena or governmental request; (ii) investigate potential
            violations of your agreement(s) with us; (iii) detect, prevent, or otherwise address fraud,
            security or technical issues; (iv) cooperate with law enforcement authorities; (v)
            respond to user support requests; or (vi) protect our, our {`users'`} or the {`public's`} rights,
            property or safety.
            <br /><br />
            <ul>
              <li>
                <b>Service Providers:</b>  The third parties with whom we may share information for these
                purposes include the underwriting insurance company(-ies), claims assessment and
                processing, insurance agents, companies that perform payment processing, marketing,
                driver scoring or other services on our behalf and our business partners, businesses
                that assist in analyzing and improving websites and mobile applications, other insurance
                companies that play a role in an insurance transaction with you, those who request
                information pursuant to a subpoena or court order, government authorities, consumer
                reporting agencies, doctors, hospitals, insurance agencies, claims adjusters, actuarial
                data providers, and other business partners. <b>Even if these service providers are
                  contractually obligated to maintain the confidentiality and security of your
                  information, we are not responsible for the privacy practices of third parties.</b>
              </li>
              <br />
              <li>
                <b>Other Insurance Companies:</b>  We may share your information with other insurance companies
                involved in your insurance transaction, such as reinsurers.
              </li>
            </ul>
          </p>
          <p className="content">
            You may limit some of the marketing of our or our {`affiliates’`} products and services to you
            by contacting us at <a onClick={() => { window.location = `mailto:info@exavalu.com` }}>
              info@exavalu.com</a>, clicking the {`"Unsubscribe"`} link in marketing emails,
            or adjusting your account settings. Your choice will apply to all people listed on your
            policy.
          </p><br />
          <h5 className="sub-heading">
            5. Third-Party Links
          </h5>
          <p className="content">
            We may include third-party links on the Exavalu Insurance Platform. We have no control over,
            and assume no responsibility for, the content, privacy policies or practices of any
            third-party websites. By including a link to a third-party website, we do not endorse or
            recommend any products or services offered or information contained at the third-party
            website. Such third party may have a privacy notice different from that of ours and the
            third-party website may provide less protection than our website. If you decide to visit
            a third-party website via a link contained on the Exavalu Insurance Platform, please ensure
            that you read their privacy notice, as we are not responsible for these third-party sites.
          </p><br/>
          <h5 className="sub-heading">
            6. Security
          </h5>
          <p className="content">
            We maintain reasonable physical, electronic and procedural safeguards to preserve the
            integrity and security of the collected information. In the event of a breach, we will
            notify you in accordance with the laws applicable in the state and/or states where such
            breach occurred.
          </p><br />
          <h5 className="sub-heading">7. Access To And Control Of Your Information
          </h5>
          <p className="content">
            You may request to review your personal information in our records by contacting us at any
            time, as provided in the {`"Contact Us"`} section below. If you believe that the information
            is incomplete or inaccurate, you can request that we correct it. We may not, however, be able
            to provide information relating to investigations, claims, litigation, or other matters. We
            will be happy to make corrections whenever possible. We will respond to your requests within
            a reasonable timeframe.
          </p>
          <p className="content">
            Please note that some web browsers and devices permit you to broadcast a preference to
            websites and online services that they {`"do not track"`} your online activities. At this time,
            we do not modify what information we collect or how we use that information based upon
            whether such a signal is broadcast or received.
          </p>
          <p className="content">
            You have the ability to accept or decline cookies using your web browser settings. If you
            choose not to accept cookies from our website, you may not be able to take full advantage of
            its features or to receive some of the services that it provides. To learn more about cookies
            and your ability to opt-out of certain advertising cookies, please visit the following
            websites: <a href='http://www.aboutads.info/choices' target="_blank" rel="noopener noreferrer">
              http://www.aboutads.info/choices</a> or
             <a href='http://www.networkadvertising.org/choices' target="_blank" rel="noopener noreferrer">
              http://www.networkadvertising.org/choices</a>.
            To find out how to opt out on a mobile device, please visit the following website: 
            <a href='https://www.networkadvertising.org/mobile-choices' target="_blank" rel="noopener noreferrer">
              https://www.networkadvertising.org/mobile-choices. </a>
          </p><br />
          <h5 className="sub-heading">8. Retention Of Your Personal Data</h5>
          <p className="content">
            Exavalu.us is committed to protecting your privacy and responsibly managing your personal
            information. We retain your information only as long as necessary to fulfill the purposes
            outlined in our Privacy Policy, maintain active accounts or relationships, and comply with
            our Global Record Retention Schedule, which is annually reviewed to align with business
            needs and legal requirements. We prioritize data minimization and offer you the right to
            access and delete your information. Exavalu follows a comprehensive data retention policy,
            balancing business needs with legal and regulatory requirements, while ensuring transparency
            and accountability in our data handling practices.
          </p><br />
          <h5 className="sub-heading">9. {`Children’s`} Personally Identifiable Information</h5>
          <p className="content">
            We do not target the Exavalu Insurance Platform to anyone under age 13. If you are under
            age 13, do not enter any personally identifiable information about you or anyone under
            the age of 13 into the Exavalu Insurance Platform. If you are a parent or a guardian who
            has discovered that your child under age 13 has submitted his or her personally
            identifiable information to us without your permission or consent, we will make
            reasonable efforts to remove the information from our database, at your written request.
            To request the removal of your {`child's`} information, please contact us as described in
            the {`"Contact Us"`} section below and include in your message your {`child's`} name and the email
            address that your child submitted.
          </p><br />
          <h5 className="sub-heading">10.Partners</h5>
          <p className="content">
            We are a Delaware limited liability company engaged in activities as a licensed insurance
            agency in <a href='https://www.exavalu.com/licensing' target="_blank" rel="noopener noreferrer">
              various states</a>, although we currently only sell policies in a more limited number of states listed in our
            <a href='https://www.exavalu.com/resources/help-center' target="_blank" rel="noopener noreferrer"> FAQs
            </a>. We sell auto insurance policies which are underwritten by
            KnightBrook Insurance Company {`(“KBIC”)`}. KBIC is an insurer under the laws of the State of
            Delaware. Activities such as claims processing, roadside assistance (if available), etc.
            are handled by KBIC and/or their services providers and are not provided by Exavalu Insurance, LLC.
          </p><br />
          <h5 className="sub-heading">11. Consumer Privacy Rights</h5>
          <p className="content">
            Depending on your state of residence, you may have specific privacy rights regarding your personal information as per applicable
            privacy legislation. These rights, subject to certain exceptions, include:
          </p>
          <p className="content">
            <b>Right to Know:</b> You have the right to request details about the personal information
            we have collected, used, disclosed, and sold/shared about you over the past twelve (12)
            months. This includes categories of personal information, the sources from which it was
            collected, the business or commercial purpose for collecting or selling the information,
            and the categories of third parties with whom we share that information.
          </p>
          <p className="content">
            <b>Right to Delete:</b> You can request the deletion of certain personal information that
            we have collected about you. This includes the right to have your personal information
            erased from our records and directing our service providers to do the same, subject to
            certain exceptions.
          </p>
          <p className="content">
            <b>Right to Correct:</b> You have the right to request corrections to any inaccurate
            personal information we hold about you. This ensures that the information we maintain
            is accurate and up-to-date.
          </p>
          <p className="content">
            <b>Right to Opt-Out of Sale/Sharing:</b> You have the right to opt-out of the sale or
            sharing of your personal information with third parties. This means you can instruct
            us not to sell your personal information to third parties.
          </p>
          <p className="content">
            <b>Right to Limit Use and Disclosure of Sensitive Personal Information:</b> You have the
            right to request that we limit the use and disclosure of your sensitive personal information
            to what is necessary to perform the services or provide the goods you have requested.
          </p>
          <p className="content">
            Exavalu does not discriminate against any individual who exercise their legal rights, such as
            denying you products and services, charging you different rates or prices, or suggesting
            or providing a different level of service to you.
          </p>
          <p className="content">
            To submit a request, please visit <a href="https://www.exavalu.com" target="_blank" rel="noopener noreferrer">
              https://www.exavalu.com</a> or call us at 1-866-862-7757.
          </p>
          <p className="content">
            To process your request and ensure the protection of your privacy and security, we will
            verify your identity before granting access to your personal information or fulfilling your
            request. This may involve asking you for additional personal information for verification
            purposes. If you are making a request on behalf of someone else, we will need to confirm
            your authority to do so.
          </p>
          <p className="content">
            For any questions regarding these rights or to appeal a response received from us, please
            call 1-866-862-7757 or email us at <a onClick={() => { window.location = `mailto:support@Exavalu.us` }}>
              support@Exavalu.us</a>. By understanding and exercising your privacy rights, you help ensure that
            we handle your personal information responsibly and transparently, in accordance with the
            applicable privacy legislation.
          </p><br />
          <h5 className="sub-heading">12. Governing Law; Jurisdiction</h5>
          <p className="content">
            We host the information we collect from the Exavalu Insurance Platform in the United States.
            If you are using or accessing the Exavalu Insurance Platform from outside the United States
            or any other region with laws or regulations governing personal data collection, use and
            disclosure that differ from the United States laws, please be advised that through your
            use of the Exavalu Insurance Platform, which is governed by U.S. law, you are transferring
            information to and from the United States and you consent to that transfer.
          </p>
          <p className="content">
            The laws of the State of Delaware and applicable United States law govern all matters
            arising out of or relating to this Privacy Notice, including, without limitation,
            interpretation, construction, performance, and enforcement, without giving effect to such
            {`state's`} conflicts of law principles or rules of construction concerning the drafter hereof.
            You hereby irrevocably and unconditionally submit to the jurisdiction of the federal and
            state courts located in New Castle County, Delaware for the purpose of any suit, action,
            or other proceeding arising out of or based upon this Privacy Notice, your access to or
            your use of the Exavalu Insurance Platform, which courts are the exclusive forum for any such
            suit, action, or other proceeding.
          </p><br />
          <h5 className="sub-heading">13. Assignment</h5>
          <p className="content">
            You may not transfer or assign any rights and permissions you grant to us hereunder.
            However, we may transfer or assign those same rights and permissions without restriction.
          </p><br />
          <h5 className="sub-heading">14. Mergers And Acquisitions</h5>
          <p className="content">
            If we decide to sell, buy, merge or otherwise reorganize our businesses in certain
            countries, this may involve us disclosing your information to prospective or actual
            purchasers and their advisers, or receiving information from sellers and their advisers.
            In the event of such disclosures of information, we will comply with applicable legal
            requirements.
          </p><br />
          <h5 className="sub-heading">15. Changes To The Privacy Notice</h5>
          <p className="content">
            We reserve the right at our discretion to change the Privacy Notice at any time. We will
            post the most current version of the Privacy Notice to our website at
            <a href="https://www.exavalu.com/privacy-pledge" target="_blank" rel="noopener noreferrer">
              https://www.exavalu.com/privacy-pledge</a>.
          </p>
          <p className="content">
            Any changes will be published on our dedicated page on <a href="https://www.exavalu.com/privacy-pledge" target="_blank" rel="noopener noreferrer">
              https://www.exavalu.com/privacy-pledge</a> and will be effective as of the date of publication
            (which will also be noted on our website).
          </p><br />
          <h5 className="sub-heading">CONTACT INFORMATION:</h5>
          <p className="content">
            Please feel free to contact us if you have any questions regarding this Privacy Policy
            or our practices. You may contact us using the following information:<br />
            Legal Department – Privacy Request<br />
            Exavalu Insurance, LLC<br /><br />
            1881 W Traverse Parkway Ste E #613<br /><br />
            Lehi, UT 84043<br /><br />
            <a onClick={() => { window.location = `mailto:info@exavalu.com` }}>info@exavalu.com </a>
          </p>*/}
          <br />
        </Container>
      </PrivacyContent>
    </div>
  );
};

export default PrivacyPolicy;
