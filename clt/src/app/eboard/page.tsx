import EboardCard from "@/components/card/eboard-card";
import HeroBanner from "@/components/hero/hero-banner";
import { eboard } from "@/constant/eboard";

export default function EboardPage() {
    return <HeroBanner content={
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5">
            {eboard.map((member, key) => {
                return (
                    <div key={key}>
                        <EboardCard name={member.name} photoUrl={member.photoUrl} role={member.role} bio={member.bio} />
                    </div>
                )
            })}
        </div>
    }
    />
}