import DetailWineCard from "@/components/wines/detail/detail-wine-card";
import DetailReviewCard from "@/components/wines/detail/detail-review-card";

export default async function WineDetailPage({
  params,
}: {
  params: { wineid: string };
}) {
  const { wineid } = await params;

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
