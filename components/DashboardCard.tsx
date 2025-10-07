import styles from "@/styles/Dashboard.module.css";
import { Icon } from "react-bootstrap-icons";

interface DashboardCardProps {
    title: string;
    value: string | number;
    IconComponent?: Icon;
}

export default function DashboardCard({ title, value, IconComponent }: DashboardCardProps) {
    return (
        <div className={styles.card}>
            {IconComponent && <IconComponent className={styles.cardIcon} />}
            <div className="mt-3">
                <h3>{title}</h3>
                <p>{value}</p>
            </div>
        </div>
    );
}
