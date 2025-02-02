export enum InterfaceType {
  WIRED = 'WIRED',
  WIFI = 'WIFI',
  UNKNOWN = 'UNKNOWN',
}
export interface Domain {
  ip: string
  fullname: string
  hostname: string
  interface: string
  interface_type: InterfaceType
  service_type: string
}
