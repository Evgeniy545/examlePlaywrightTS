import {faker} from '@faker-js/faker';

export interface Lead {
  data: LeadData;
}

export interface LeadData {
  type:          string;
  attributes:    PurpleAttributes;
  relationships: Relationships;
}

export interface PurpleAttributes {
  epgu_order_id:           string;
  preferrential_category:  boolean;
  has_confidant:           boolean;
  owner:                   Owner;
  feedback_type:           string;
  contact_info:            ContactInfo;
  planned_gas_consumption: string;
  last_tu_number:          string;
  last_tu_date:            null;
  extra_info:              string;
  contract_sign_type:      string;
  snt:                     boolean;
  snt_inn:                 string;
  snt_ogrn:                string;
  additional_activity_ids: any[];
}

export interface ContactInfo {
  fullname: string;
  email:    string;
  phone:    string;
}

export interface Owner {
  phone:      string;
  fullname:   string;
  email:      string;
  snils:      string;
  birth_date: null;
  passport:   Passport;
}

export interface Passport {
  branch:                  string;
  date:                    null;
  number:                  string;
  series:                  string;
  identification_document: string;
}

export interface Relationships {
  service:                Branch;
  gas_object_address:     Address;
  organization:           Branch;
  source:                 Branch;
  attachments:            Attachment[];
  branch:                 Branch;
  correspondence_address: Address;
}

export interface Attachment {
  data: AttachmentData;
}

export interface AttachmentData {
  type:       string;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  original_filename: string;
  kind:              string;
  file:              string;
}

export interface Branch {
  data: BranchData;
}

export interface BranchData {
  type: string;
  id:   string;
}

export interface Address {
  data: CorrespondenceAddressData;
}

export interface CorrespondenceAddressData {
  type:       string;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
  area:                     string;
  area_fias_id:             string;
  block:                    string;
  cadastral_home_number:    string;
  cadastral_number:         string;
  city:                     string;
  city_fias_id:             string;
  extra:                    string;
  flat:                     string;
  has_capital_construction: boolean;
  house:                    string;
  house_fias_id:            string;
  oktmo:                    string;
  region:                   string;
  region_fias_id:           string;
  room:                     string;
  settlement:               string;
  settlement_fias_id:       string;
  street:                   string;
  street_fias_id:           string;
  title:                    string;
  zip_code:                 string;
}
