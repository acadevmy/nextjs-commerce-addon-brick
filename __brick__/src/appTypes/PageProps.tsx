import { RootParams } from "@/appTypes/RootProps";

export interface HomePageParamsRoute extends RootParams {}
export interface HomePageParams extends HomePageParamsRoute {
  type: "homePage";
}
export interface HomePageProps {
  params: Promise<HomePageParamsRoute>;
}

export interface DynamicTimeZonePageParamsRoute extends RootParams {
  time_zone: string;
}

export interface DynamicTimeZonePageParams
  extends DynamicTimeZonePageParamsRoute {
  type: "dynamic_time_zone";
}

export interface DynamicTimeZonePageProps {
  params: Promise<DynamicTimeZonePageParamsRoute>;
}

export type PagesParams = HomePageParams | DynamicTimeZonePageParams;
