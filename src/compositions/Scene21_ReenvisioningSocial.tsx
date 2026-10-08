import React from "react";
import { CenteredClaim } from "./Scene18_ReenvisioningFlip";
import { SCENE21_REENVISIONING_SOCIAL_CONFIG } from "../data/config";

export const Scene21_ReenvisioningSocial: React.FC = () => (
  <CenteredClaim
    label={SCENE21_REENVISIONING_SOCIAL_CONFIG.label}
    duration={SCENE21_REENVISIONING_SOCIAL_CONFIG.duration}
  />
);
