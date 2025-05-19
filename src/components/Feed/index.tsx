import { Post } from '../Post'
import { FeedHeader } from './components'
import styles from './styles.module.css'

export const Feed = () => {
    return (
        <main className={styles.feedContainer}>
            <FeedHeader />

            <div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </main>
    )
}