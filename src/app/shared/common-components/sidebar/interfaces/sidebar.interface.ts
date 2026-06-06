import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface SidebarTabs {
  id: number;
  name: string;
  icon: IconDefinition;
  route: string;
  children?: SidebarTabs[];
}
