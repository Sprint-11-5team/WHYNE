import DetailWineCard from "@/components/wines/detail/detail-wine-card";
import DetailReviewCard from "@/components/wines/detail/detail-review-card";

interface WineDetailPageProps {
  params: {
    wineid: string;
  };
}

export default function WineDetailPage({ params }: WineDetailPageProps) {
  const { wineid } = params;
  return (
    <div>
      <div className="flex flex-col mt-[2rem]">
        <DetailWineCard id={wineid} />
        <div className="mt-[6rem] mx-auto">
          <DetailReviewCard wineid={wineid} />
        </div>
      </div>
    </div>
  );
}
