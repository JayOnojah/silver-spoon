import {
  Hr,
  Img,
  Body,
  Head,
  Html,
  Link,
  Text,
  Preview,
  Heading,
  Section,
  Container,
} from "@react-email/components";

interface VerifyEmailProps {
  name: string;
  code: string;
}

const baseUrl = "https://www.usesilverspoon.com";

export const VerifyEmail = ({ name, code }: VerifyEmailProps) => {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Email Verification</Preview>
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
              <Heading style={h1}>Verify your email address</Heading>
              <Text>
                <strong>Hi, {name}</strong>! Thank you for choosing
                <span style={blue}> SilverSpoon</span>.
              </Text>

              <Text style={mainText}>
                We want to make sure it's really you. Please enter the following
                verification code when prompted. If you don&apos;t want to
                create an account, you can ignore this message.
              </Text>
              <Section>
                <Text style={verifyText}>Verification code</Text>
                <Text style={codeText}>{code}</Text>
                <Text style={validityText}>
                  (This code is valid for 10 minutes)
                </Text>
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                SilverSpoon will never email you and ask you to disclose or
                verify your password, credit card, or banking account number.
              </Text>
            </Section>
          </Section>

          <Text style={footerText}>
            This message was produced and distributed by SilverSpoon, a product
            of SILVER SPOON TECH LTD, 7th Floor, LAGOS, Mulliner Towers, Ikoyi,
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
  backgroundColor: "#e8e8e8",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
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
