import { DomainId, DomainProfile } from '../types';
import { softwareDomain } from './software';
import { mechanicalDomain } from './mechanical';
import { electronicsDomain } from './electronics';
import { biotechDomain } from './biotech';
import { pharmaDomain } from './pharma';
import { chemistryDomain } from './chemistry';
import { industrialProcessesDomain } from './industrialProcesses';
import { energyDomain } from './energy';
import { medicalDevicesDomain } from './medicalDevices';
import { genericDomain } from './generic';

export const DOMAIN_PROFILES: Record<DomainId, DomainProfile> = {
  software: softwareDomain,
  mechanical: mechanicalDomain,
  electronics: electronicsDomain,
  biotech: biotechDomain,
  pharma: pharmaDomain,
  chemistry: chemistryDomain,
  industrialProcesses: industrialProcessesDomain,
  energy: energyDomain,
  medicalDevices: medicalDevicesDomain,
  generic: genericDomain,
};

export const ALL_DOMAINS: DomainProfile[] = [
  softwareDomain,
  mechanicalDomain,
  electronicsDomain,
  biotechDomain,
  pharmaDomain,
  chemistryDomain,
  industrialProcessesDomain,
  energyDomain,
  medicalDevicesDomain,
  genericDomain,
];

export function getDomainProfile(id?: DomainId | string): DomainProfile {
  if (id && id in DOMAIN_PROFILES) {
    return DOMAIN_PROFILES[id as DomainId];
  }
  return DOMAIN_PROFILES.generic;
}

export function getAllDomainProfiles(): DomainProfile[] {
  return ALL_DOMAINS;
}

export function getDomainDisciplinesSuggestions(id?: DomainId | string): string[] {
  const profile = getDomainProfile(id);
  return profile.secondaryDisciplinesSuggestions;
}
