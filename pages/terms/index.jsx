import { useRouter } from "next/router";

const Terms = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push("/");
    }

    const handleGoBack = () => {
        router.back();
    }

    return (
        <div className="article terms w-11/12 text-justify whitespace-pre-line">
            <h2 className="my-2"><strong>Terms and Conditions</strong></h2>

            <p>Welcome to Instashop!</p>

            <p>These terms and conditions outline the rules and regulations for the use of Instashop's Website, located at www.instashop-seven.vercel.app.</p>

            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Instashop if you do not agree to take all of the terms and conditions stated on this page.</p>

            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person logged on this website and compliant to the Company’s terms and conditions. "User", "Users" refers to you and/or any other person visiting this website and compliant to the Company's terms and conditions.  "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of France. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

            <h3 className="flex w-full justify-start my-2"><strong>Cookies</strong></h3>

            <p>We employ the use of cookies. By accessing Instashop, you agreed to use cookies in agreement with the Instashop's Privacy Policy. </p>

            <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

            <h3 className="flex w-full justify-start my-2"><strong>License</strong></h3>

            <p>Unless otherwise stated, Instashop and/or its licensors own the intellectual property rights for all material on Instashop other than the products that appear available for purchase. You may access this from Instashop for your own personal use subjected to restrictions set in these terms and conditions.</p>

            <p>Only as long as you share a link to this website, you are allowed to:</p>
            <ul className="list-disc my-2">
                <li>Republish material from Instashop</li>
                <li>Sell, rent or sub-license material from Instashop</li>
                <li>Reproduce, duplicate or copy material from Instashop</li>
                <li>Redistribute content from Instashop</li>
            </ul>

            <p>This Agreement shall begin on the date October 30th 2022.</p>

            <h3 className="flex w-full justify-start my-2"><strong>Conditions of Use</strong></h3>

            <p>Instashop is solely a testing purpose ecommerce website, AT NO POINT should it be used expecting to actually buy any of the products present on the store.</p>

            <p>We do not own any of the products present on the store of Instashop, and we do not sell thems, they're on the website exclusively for illustration and testing purposes. If you are the owner of any of the products, and if you wish to have them removed, please write me an email at the following address: {process.env.NEXT_PUBLIC_EMAIL}, and upon verification I shall have the product(s) in question removed from the store within 72 hours.</p>

            <p>You must NOT:</p>
            <ul className="list-disc my-2">
                <li>Use Instashop expecting to buy any real product</li>
                <li>Use any actual credit card number when requested to enter one</li>
            </ul>

            <p>In order to test the website and simulate a purchase, after being redirected to the payment page, you should:</p>
            <ul className="list-disc my-2">
                <li>Use the credit card number <span className="font-semibold">4242 4242 4242 4242</span>. This is to be entered in the payment form</li>
                <li>Use a valid expiration date such as 12/34</li>
                <li>Use any three-digit CVC code (four digits for American Express cards)</li>
                <li>Use the value of your choice for the other fields of the form</li>
            </ul>
            <p> Parts of this website offer an opportunity for users to review the products with a 5 stars based score as well as a message. Instashop does not filter, edit, publish or inspect the Reviews prior to their presence on the website. Reviews do not reflect the views and opinions of Instashop, its agents and / or affiliates. Reviews reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Instashop shall not be liable for the Reviews or for any liability, damages or expenses caused and / or suffered as a result of any use of and / or posting of and / or appearance of the Reviews on this website.</p>

            <p><span className="font-semibold mr-1">At no point are these Reviews to be considered as actual reviews </span>{" "} since this website is only for testing and illustration purposes.</p>

            <p>Instashop reserves the right to monitor all Reviews of a reported User and, upon finding any Reviews which can be considered inappropriate, offensive or causing breach of these Terms and Conditions, Instashop reserves the right to implement disciplinary actions like suspending, deactivating or removing altogether the User account in question.</p>

            <p>Instashop reserves the right to monitor all Reviews of a reported User including the ones he joined and, in case of any reported activity which can be considered inappropriate, offensive, threatening, violent, causing any safety hazard or breach of these Terms and Conditions, Instashop reserves the right to implement disciplinary actions like suspending, deactivating or removing altogether the User account in question, as well as working with the local law enforcement in case of a complaint being filed.</p>

            <p>You agree that upon creating a profile on our website:</p>

            <ul className="list-disc my-2">
                <li>You are entitled to simulate product purchasing without actually purchasing anything</li>
                <li>You are entitled to leave a review on the products that are present on the website</li>
                <li>The Reviews should not be taken at face value even remotely, they are just another feature for testing</li>
                <li>The Reviews must not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material</li>
                <li>The Reviews will not be used to solicit or promote any unlawful activity.</li>
            </ul>

            <h3 className="flex w-full justify-start my-2"><strong>Hyperlinking to our Content</strong></h3>

            <p>The following organizations may link to our Website without prior written approval:</p>

            <ul className="list-disc my-2">
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>

            <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

            <p>We may consider and approve other link requests from the following types of organizations:</p>

            <ul className="list-disc my-2">
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
            </ul>

            <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Instashop; and (d) the link is in the context of general resource information.</p>

            <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>

            <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Instashop. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>

            <p>Approved organizations may hyperlink to our Website as follows:</p>

            <ul className="list-disc my-2">
                <li>By use of our corporate name; or</li>
                <li>By use of the uniform resource locator being linked to; or</li>
                <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party’s site.</li>
            </ul>

            <p>No use of Instashop's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

            <h3 className="flex w-full justify-start my-2"><strong>iFrames</strong></h3>

            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

            <h3 className="flex w-full justify-start my-2"><strong>Content Liability</strong></h3>

            <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

            <h3 className="flex w-full justify-start my-2"><strong>Your Privacy</strong></h3>

            <p>Please read Privacy Policy</p>

            <h3 className="flex w-full justify-start my-2"><strong>Reservation of Rights</strong></h3>

            <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

            <h3 className="flex w-full justify-start my-2"><strong>Removal of links from our website</strong></h3>

            <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

            <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>

            <h3 className="flex w-full justify-start my-2"><strong>Disclaimer</strong></h3>

            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>

            <ul className="list-disc my-2">
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>

            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>

            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>

            <p className="flex-x">
                <button onClick={handleGoHome} className="btn btn-link mx-2 my-1">
                    Back To Home
                </button>
                <button onClick={handleGoBack} className="btn btn-link mx-2 my-1">
                    Previous Page
                </button>
            </p>
        </div >
    );
};

export default Terms;