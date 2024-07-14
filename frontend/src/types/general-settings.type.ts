export type GeneralSettingsType =  {

    success: number,
    type: string,
    settings: {
    logo: {
        setting_value: string | null,
        setting_json: any
    },
    companyName: {
        setting_value: string | null,
        setting_json: any,
    },
    address: {
        setting_value: string,
        setting_json: any,
    },
    phone: {
      setting_value: string,
        setting_json: any,
    },
    email: {
      setting_value: string,
        setting_json: any,
    },
    fax: {
      setting_value: string,
        setting_json: any,
    },
    businessHours: {
      setting_value: string,
        setting_json: any,
    },
    metaTitle: {
      setting_value: string,
        setting_json: any,
    },
    metaDesc: {
      setting_value: string,
        setting_json: any,
    },
    addressOnMap: {
      setting_value: string,
        setting_json: any,
    },
    donationLink: {
      setting_value: string,
        setting_json: any,
    }
  }
}
