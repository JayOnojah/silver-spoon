import {
  Hr,
  Img,
  Body,
  Head,
  Html,
  Link,
  Text,
  Button,
  Preview,
  Heading,
  Section,
  Container,
} from "@react-email/components";

interface SetPasswordProps {
  name: string;
  resetLink: string;
  business: string;
  position: string;
}

const baseUrl = "https://www.usesilverspoon.com";

export const SetPassword = ({
  name,
  resetLink,
  business,
  position,
}: SetPasswordProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Set up your password for KeepOS</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                style={logoSection}
                src={`${baseUrl}/images/pngs/logo.png`}
                height="25"
                alt="SilverSpoon Logo"
              />
            </Section>
            <Section style={upperSection}>
              <br />
              <Heading style={h1}>Set your password for SilverSpoon</Heading>
              <Text>
                <strong>Hi, {name}</strong>! You have been invited by {business}{" "}
                as a {position} on
                <span style={blue}> SilverSpoon</span>.
              </Text>

              <Text style={mainText}>
                Click on the button below to set up your password so that you
                can login.
              </Text>
              <Button style={button} href={resetLink}>
                Set-up Your Password
              </Button>
            </Section>
            <br />
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                KeepOS will never call you and ask you to disclose or verify
                your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>

          <Text style={footerText}>
            This message was produced and distributed by SilverSpoon, a product
            of SILVER SPOON TESH LTD, 7th Floor, LAGOS, Mulliner Towers, Ikoyi,
            Lagos, Nigeria. © 2022, SilverSpoon. All rights reserved.
            SilverSpoon is a registered trademark of{" "}
            <Link
              href="https://usesilverspoon.com"
              target="_blank"
              style={link}>
              SILVER SPOON TECH LTD
            </Link>
            . View our{" "}
            <Link
              href="https://usesilverspoon.com/privacy"
              target="_blank"
              style={link}>
              Privacy Policy
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#fff",
  color: "#212121",
};

const container = {
  padding: "20px",
  margin: "0 auto",
  backgroundColor: "#eee",
};

const logoSection = {
  width: "200px",
  maxWidth: "200px",
  height: "auto",
  marginLeft: "24px",
  display: "block",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "15px",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "12px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "24px 0",
};

const imageSection = {
  backgroundColor: "#252f3d",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const coverSection = { backgroundColor: "#fff" };

const upperSection = { padding: "25px 35px" };

const lowerSection = { padding: "25px 35px" };

const footerText = {
  ...text,
  fontSize: "12px",
  padding: "0 20px",
};

const verifyText = {
  ...text,
  fontWeight: "bold",
};

const codeText = {
  ...text,
  fontWeight: "bold",
  fontSize: "36px",
};

const validityText = {
  ...text,
  margin: "10px 0",
};

const blue: React.CSSProperties = {
  color: "#2563eb",
  fontWeight: "bold",
};

const mainText = { ...text, marginBottom: "14px" };

const cautionText = { ...text, margin: "0px" };
