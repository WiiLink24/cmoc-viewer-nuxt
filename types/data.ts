export interface Mii {
  entryId?: number;
  artisanId: number;
  initials?: string;
  skill?: number;
  nickname?: string;
  gender?: 1 | 2;
  countryId: number;
  miiData: string;
  likes: number;
  permLikes?: number;
  ranking?: number;
  contestId?: number;
  artisan?: Artisan;
  wiiNumber?: bigint;
  artisan_is_master?: boolean;
}

export interface Contest {
  contest_id: number;
  has_thumbnail: boolean;
  english_name: string;
  status: string;
  open_time: string;
  close_time: string;
  has_souvenir: boolean;
}

export interface Artisan {
  name: string;
  country_id?: number;
  wii_number?: bigint;
  mii_data?: string;
  number_of_posts?: any;
  total_likes?: number;
  isMaster: boolean;
  last_post?: string;
  artisanId?: number;
}
