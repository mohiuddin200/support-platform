import WidgetView from '@/modules/widget/ui/views/widget-view'
import React from 'react'

interface Props {
  searchParams: Promise<{ organizationId: string }>;
}

const WidgetPage = async ({ searchParams }: Props) => {
  const { organizationId } = await searchParams;
  return (
    <WidgetView organizationId={organizationId} />
  );
};

export default WidgetPage;