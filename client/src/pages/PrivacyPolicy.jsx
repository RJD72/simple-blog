import { List } from "flowbite-react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-3 lg:mx-auto my-10 ">
      <h1 className="mb-3">Privacy Policy</h1>
      <h2 className="mb-2">Last Updated: 12/11/2024</h2>
      <h3 className="font-bold">1. Introduction</h3>
      <p className="mb-3">
        Welcome to Simple Blog (“we,” “us,” or “our”). This Privacy Policy
        explains how we collect, use, disclose, and safeguard your personal
        information when you visit our personal blog website (“Simple Blog”).
        Please read this Privacy Policy carefully. If you do not agree with the
        terms of this Privacy Policy, please do not access the Site.
      </p>
      <h3 className="font-bold">2. Information We Collect</h3>
      <p className="">We may collect the following types of information:</p>
      <List className="mb-3">
        <List.Item>
          Personal Information You Voluntarily Provide: If you choose to leave
          comments, subscribe to our newsletter, or contact us through a form,
          we may ask for personal information such as your name, email address,
          and any other details you elect to share.
        </List.Item>
        <List.Item>
          Non-Personal Information Automatically Collected: We may use cookies,
          log files, and similar technologies to automatically collect
          non-personal information about your device and browsing behavior, such
          as IP address, browser type, device type, the pages you visit, and the
          time spent on the Site.
        </List.Item>
      </List>
      <h3 className="font-bold"> How We Use Your Information</h3>
      <p className="">
        We use the collected information for various purposes, including:
      </p>
      <List className="mb-3">
        <List.Item>
          To Provide and Maintain the Site: Ensuring that content loads properly
          and that the Site functions as intended.
        </List.Item>
        <List.Item>
          To Improve User Experience: Analyzing visitor interaction to enhance
          and personalize the Site’s content, layout, and features.
        </List.Item>
        <List.Item>
          To Communicate with You: Responding to comments or inquiries, sending
          updates, or providing newsletters if you have subscribed.
        </List.Item>
        <List.Item>
          To Protect the Site: Monitoring for and preventing any fraudulent,
          suspicious, or harmful activity.
        </List.Item>
      </List>
      <h3 className="font-bold">4. Cookies and Similar Technologies</h3>
      <p className="mb-3">
        We may use cookies, web beacons, and similar tracking technologies to
        enhance your experience on the Site. Cookies help us remember your
        preferences and understand how you interact with our content. Most web
        browsers allow you to control cookies through their settings. You can
        choose to accept, decline, or delete cookies. Please note that blocking
        cookies may affect your access to certain features of the Site.
      </p>
      <h3 className="font-bold">5. Third-Party Services and Links</h3>
      <p className="mb-3">
        Our Site may include links to third-party websites or services that are
        not operated or controlled by us. We are not responsible for the privacy
        practices of these third parties. We encourage you to review their
        privacy policies before providing any personal information.
      </p>
      <h3 className="font-bold">6. Data Sharing and Disclosure</h3>
      <p className="mb-3">
        We do not sell or rent your personal information. We may share
        non-personal, aggregated data with third parties for analytics or
        promotional purposes. Personal information may be disclosed to comply
        with legal requirements, respond to lawful requests by public
        authorities, or protect our rights, property, or safety.
      </p>
      <h3 className="font-bold">7. Data Security</h3>
      <p className="mb-3">
        We use reasonable administrative, technical, and physical security
        measures to help protect your personal information. However, no data
        transmission or storage system is completely secure. While we strive to
        use commercially acceptable means to protect your information, we cannot
        guarantee absolute security.
      </p>
      <h3 className="font-bold">8. Children’s Privacy</h3>
      <p className="mb-3">
        This Site is intended for general audiences and is not directed toward
        children under the age of 13. We do not knowingly collect personal
        information from children. If you believe we have collected such
        information, please contact us so that we can take appropriate steps to
        remove it.
      </p>
      <h3 className="font-bold">9. International Visitors</h3>
      <p className="mb-3">
        If you are accessing the Site from outside the country in which it is
        hosted, please be aware that your information may be transferred to and
        stored in a country that may have data protection laws different from
        those of your country.
      </p>
      <h3 className="font-bold">10. Changes to This Privacy Policy</h3>
      <p className="mb-3">
        We reserve the right to update or modify this Privacy Policy at any
        time. When we make changes, we will revise the “Last Updated” date at
        the top of this page. We encourage you to review this Policy
        periodically to stay informed about how we are protecting the
        information we collect.
      </p>
      <h3 className="font-bold">11. Contact Us</h3>
      <p className="mb-3">
        If you have questions or concerns about this Privacy Policy, please feel
        free to contact us at: [Your Contact Email Address]
      </p>
      <p className="mb-3">
        By using the Site, you acknowledge that you have read, understood, and
        agreed to this Privacy Policy.
      </p>
    </div>
  );
};
export default PrivacyPolicy;
