import { Timestamp } from "firebase/firestore";

function formatDate(timestamp: Timestamp) {
    if (timestamp instanceof Timestamp) {
        return timestamp.toDate().toLocaleDateString();
    }
    return timestamp ? new Date(timestamp).toLocaleDateString() : '';
}

export default formatDate;