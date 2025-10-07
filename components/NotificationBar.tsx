import { useState } from 'react'
import styles from '@/styles/NotificationBar.module.css'
import { X } from 'react-bootstrap-icons'

export default function NotificationBar() {
    const [visible, setVisible] = useState(true)

    if (!visible) return null

    return (
        <div className={styles.notificationBar}>
            <p className={styles.text}>Welcome to NextCart</p>
            <button
                className={styles.closeBtn}
                onClick={() => setVisible(false)}
                aria-label="Close notification"
            >
                <X size={24} />
            </button>
        </div>
    )
}
