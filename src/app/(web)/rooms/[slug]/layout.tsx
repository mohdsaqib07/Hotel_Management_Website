import { type Metadata } from "next";

// we can not export both the metadata object and the dynamic generateMetadata function from the same route
type Props = {
  params: {
    slug: string;
  };
};
export const generateMetadata = async ({ params }: Props) => {
  const roomName = params.slug.split("-");
  const updatedRoomName = roomName.map(
    (element) => element[0].toUpperCase() + element.slice(1)
  );
  const roomTitle = updatedRoomName.join(" ");

  return {
    title: `Hotelzz | ${roomTitle}`,
  };
};

export default function IndividualRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
