import { useState } from 'react';

export default function useSidebarToggle() {
  const [collapsed, setCollapsed] = useState(false);
  return { collapsed, toggle: () => setCollapsed(c => !c) };
}
