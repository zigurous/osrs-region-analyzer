import { Text } from '@zigurous/forge-react';
import React, { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import '../styles/footer-bar.css';

export default function FooterBar() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsAndConditions, setShowTermsAndConditions] = useState(false);
  return (
    <footer className="footer-bar">
      <div className="flex align-center">
        <Text className="mx-xs" color="muted" type="caption">
          Copyright © {new Date().getUTCFullYear()}{' '}
          <a className="underline" href="https://zigurous.com" target="_blank">
            Zigurous
          </a>
        </Text>
        <Text className="mx-xs" color="muted" type="caption">
          <a
            className="cursor-pointer underline"
            onClick={() => {
              setShowTermsAndConditions(true);
            }}
          >
            Terms of Use
          </a>
        </Text>
        <Text className="mx-xs" color="muted" type="caption">
          <a
            className="cursor-pointer underline"
            onClick={() => {
              setShowPrivacyPolicy(true);
            }}
          >
            Privacy Policy
          </a>
        </Text>
      </div>
      <div className="flex align-center">
        <Text className="mx-xs" color="muted" type="caption">
          Thank you to{' '}
          <a
            className="underline"
            href="https://oldschool.runescape.wiki/"
            target="_blank"
          >
            OSRS Wiki
          </a>
        </Text>
        <Text className="mx-xs" color="muted" type="caption">
          <i>RuneScape Old School</i> is a trademark of{' '}
          <a
            className="underline"
            href="https://www.jagex.com/"
            target="_blank"
          >
            Jagex Limited
          </a>
        </Text>
      </div>
      <PrivacyPolicy
        open={showPrivacyPolicy}
        onRequestClose={() => setShowPrivacyPolicy(false)}
      />
      <TermsAndConditions
        open={showTermsAndConditions}
        onRequestClose={() => setShowTermsAndConditions(false)}
      />
    </footer>
  );
}
