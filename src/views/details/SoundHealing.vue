<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { VideoPlay, VideoPause, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { getPlaylistTracks, getSongUrls } from '@/api/music.ts';

const router = useRouter();
const currentPlaying = ref(0);
const isPlaying = ref(false);
const loading = ref(true);

interface Song {
    id: number;
    title: string;
    artist: string;
    duration: string;
    cover: string;
    audioUrl: string;
}

const playlist = ref<Song[]>([]);

const audio = new Audio();

const fetchPlaylist = async () => {
    try {
        const response = await getPlaylistTracks(13094713145);
        if (response && response.songs) {
            const songIds = response.songs.map((song: any) => song.id).join(',');
            const urlResponse = await getSongUrls(songIds);

            console.log("Audio URLs:", urlResponse.data.map((item: any) => item.url));

            playlist.value = response.songs.map((song: any, index: number) => ({
                id: song.id,
                title: song.name,
                artist: song.ar.map((artist: any) => artist.name).join(', '),
                duration: formatTime(song.dt / 1000),
                cover: song.al.picUrl,
                audioUrl: urlResponse.data[index]?.url || ''  // 使用获取的URL
            }));
            loading.value = false;
        } else {
            console.error("No songs found in the response");
        }
    } catch (error) {
        console.error("Failed to fetch playlist:", error);
    }
};

const currentSong = computed(() => playlist.value[currentPlaying.value] || {});

const playSong = (index: number) => {
    currentPlaying.value = index;
    audio.src = currentSong.value.audioUrl;
    audio.play().catch(error => console.error("Audio play error:", error));
    isPlaying.value = true;
};

const togglePlay = () => {
    if (isPlaying.value) {
        audio.pause();
    } else {
        audio.src = currentSong.value.audioUrl;
        audio.play().catch(error => console.error("Audio play error:", error));
    }
    isPlaying.value = !isPlaying.value;
};

const nextSong = () => {
    if (playlist.value.length > 0) {
        currentPlaying.value = (currentPlaying.value + 1) % playlist.value.length;
        audio.src = currentSong.value.audioUrl;
        if (isPlaying.value) {
            audio.play().catch(error => console.error("Audio play error:", error));
        }
    }
};

const prevSong = () => {
    if (playlist.value.length > 0) {
        currentPlaying.value = currentPlaying.value === 0 ? playlist.value.length - 1 : currentPlaying.value - 1;
        audio.src = currentSong.value.audioUrl;
        if (isPlaying.value) {
            audio.play().catch(error => console.error("Audio play error:", error));
        }
    }
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const goBack = () => {
    router.push('/relaxation');
};

onMounted(() => {
    fetchPlaylist();
});
</script>

<template>
    <div class="sound-healing">
        <div class="header">
            <el-button style="font-size: 1rem;" @click="goBack" text>
                返回
            </el-button>
            <h1>声音疗愈</h1>
        </div>

        <el-skeleton :loading="loading" animated>
            <template #default>
                <div class="player-container" v-if="playlist.length > 0">
                    <div class="now-playing">
                        <div class="cover-art">
                            <img :src="currentSong.cover" :alt="currentSong.title">
                            <div class="overlay" :class="{ active: isPlaying }"></div>
                        </div>
                        <div class="song-info">
                            <h2>{{ currentSong.title }}</h2>
                            <p>{{ currentSong.artist }}</p>
                        </div>
                        <div class="controls">
                            <el-button circle @click="prevSong" class="control-btn">
                                <el-icon>
                                    <ArrowLeft />
                                </el-icon>
                            </el-button>
                            <el-button circle class="play-btn" @click="togglePlay">
                                <el-icon style="font-size: 1.5rem;">
                                    <svg v-if="!isPlaying" t="1735997052417" class="icon" viewBox="0 0 1024 1024"
                                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2530" width="32"
                                        height="32">
                                        <path
                                            d="M893.035 463.821679C839.00765 429.699141 210.584253 28.759328 179.305261 8.854514 139.495634-16.737389 99.686007 17.385148 99.686007 57.194775v909.934329c0 45.496716 42.653172 68.245075 76.775709 48.340262 45.496716-28.435448 676.763657-429.375262 716.573284-454.967165 34.122537-22.748358 34.122537-76.775709 0-96.680522z"
                                            fill="#515151" p-id="2531"></path>
                                    </svg>
                                    <svg v-else t="1735997070249" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="2788" width="32" height="32">
                                        <path d="M128 0h253.155556v1024H128V0z m512 0h256v1024h-256V0z" fill="#515151"
                                            p-id="2789"></path>
                                    </svg>
                                </el-icon>
                            </el-button>
                            <el-button circle @click="nextSong" class="control-btn">
                                <el-icon>
                                    <ArrowRight />
                                </el-icon>
                            </el-button>
                        </div>
                    </div>

                    <div class="playlist">
                        <h3>播放列表</h3>
                        <div class="songs">
                            <div v-for="(song, index) in playlist" :key="song.id" class="song-item"
                                :class="{ active: index === currentPlaying }" @click="playSong(index)">
                                <div class="song-info">
                                    <span class="number">{{ index + 1 }}</span>
                                    <img :src="song.cover" :alt="song.title" class="mini-cover">
                                    <div class="details">
                                        <span class="title">{{ song.title }}</span>
                                        <span class="artist">{{ song.artist }}</span>
                                    </div>
                                </div>
                                <div class="duration">{{ song.duration }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </el-skeleton>

        <div class="healing-guide">
            <h2>音乐疗愈小贴士</h2>
            <div class="guide-cards">
                <div class="guide-card">
                    <el-icon :size="24" color="#e8d575">
                        <svg t="1735997052417" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            p-id="2530">
                            <path
                                d="M512 128c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z m0 64c176 0 320 144 320 320s-144 320-320 320-320-144-320-320 144-320 320-320z"
                                fill="currentColor"></path>
                            <path
                                d="M512 320c-105.6 0-192 86.4-192 192s86.4 192 192 192 192-86.4 192-192-86.4-192-192-192z"
                                fill="currentColor"></path>
                        </svg>
                    </el-icon>
                    <h3>专注聆听</h3>
                    <p>找一个安静的环境，闭上眼睛，让自己完全沉浸在音乐中</p>
                </div>
                <div class="guide-card">
                    <el-icon :size="24" color="#e8d575">
                        <svg t="1735997052417" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            p-id="2530">
                            <path
                                d="M512 128c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z m0 64c176 0 320 144 320 320s-144 320-320 320-320-144-320-320 144-320 320-320z"
                                fill="currentColor"></path>
                            <path
                                d="M512 320c-105.6 0-192 86.4-192 192s86.4 192 192 192 192-86.4 192-192-86.4-192-192-192z"
                                fill="currentColor"></path>
                        </svg>
                    </el-icon>
                    <h3>深呼吸</h3>
                    <p>配合音乐节奏进行深呼吸，让身心达到放松状态</p>
                </div>
                <div class="guide-card">
                    <el-icon :size="24" color="#e8d575">
                        <svg t="1735997052417" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            p-id="2530">
                            <path
                                d="M512 128c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z m0 64c176 0 320 144 320 320s-144 320-320 320-320-144-320-320 144-320 320-320z"
                                fill="currentColor"></path>
                            <path
                                d="M512 320c-105.6 0-192 86.4-192 192s86.4 192 192 192 192-86.4 192-192-86.4-192-192-192z"
                                fill="currentColor"></path>
                        </svg>
                    </el-icon>
                    <h3>定期练习</h3>
                    <p>建议每天固定时间进行音乐疗愈，培养良好的放松习惯</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sound-healing {
    min-height: 100vh;
    padding: 2rem;
    background-color: #fafafa;

    .header {
        display: flex;
        align-items: center;
        margin-bottom: 2rem;

        h1 {
            margin-left: 1rem;
            font-size: 2.2rem;
            color: #2c3e50;
            position: relative;
            padding-left: 0.5em;

            &::before {
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 4px;
                height: 70%;
                background-color: #e8d575;
                border-radius: 2px;
            }
        }
    }

    .player-container {
        max-width: 1000px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        padding: 2rem;
        background: white;
        border-radius: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

        .now-playing {
            padding: 2rem;
            text-align: center;

            .cover-art {
                width: 300px;
                height: 300px;
                margin: 0 auto 2rem;
                position: relative;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.2);
                    opacity: 0;
                    transition: opacity 0.3s ease;

                    &.active {
                        opacity: 1;
                    }
                }
            }

            .song-info {
                margin-bottom: 2rem;

                h2 {
                    font-size: 1.8rem;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                p {
                    color: #666;
                    font-size: 1.1rem;
                }
            }

            .controls {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                margin-bottom: 2rem;

                .el-button {
                    width: 48px;
                    height: 48px;

                    &.play-btn {
                        width: 64px;
                        height: 64px;
                        background-color: #e8d575;
                        border-color: #e8d575;
                        color: white;

                        &:hover {
                            background-color: darken(#e8d575, 5%);
                        }
                    }
                }
            }
        }

        .playlist {
            padding: 1rem;

            h3 {
                font-size: 1.4rem;
                color: #2c3e50;
                margin-bottom: 1.5rem;
                padding-left: 1rem;
                border-left: 4px solid #e8d575;
            }

            .songs {
                max-height: 400px;
                overflow-y: auto;

                /* 自定义滚动条样式 */
                &::-webkit-scrollbar {
                    width: 6px;
                    /* 滚动条宽度 */
                }

                &::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    /* 滚动条轨道颜色 */
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #e8d575;
                    /* 滚动条颜色 */
                    border-radius: 10px;
                    /* 滚动条圆角 */
                }

                .song-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background-color: #f8f9fa;
                    }

                    &.active {
                        background-color: #fdfbf2;
                        border-left: 4px solid #e8d575;
                    }

                    .song-info {
                        display: flex;
                        align-items: center;
                        gap: 1rem;

                        .number {
                            color: #999;
                            font-size: 0.9rem;
                            width: 20px;
                        }

                        .mini-cover {
                            width: 48px;
                            height: 48px;
                            border-radius: 8px;
                            object-fit: cover;
                        }

                        .details {
                            display: flex;
                            flex-direction: column;
                            gap: 0.3rem;

                            .title {
                                color: #2c3e50;
                                font-weight: 500;
                            }

                            .artist {
                                color: #666;
                                font-size: 0.9rem;
                            }
                        }
                    }

                    .duration {
                        color: #666;
                        font-size: 0.9rem;
                    }
                }
            }
        }
    }
}

@media (max-width: 1024px) {
    .player-container {
        grid-template-columns: 1fr !important;
    }
}

.healing-guide {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    h2 {
        color: #2c3e50;
        font-size: 1.6rem;
        margin-bottom: 1.5rem;
        padding-left: 1rem;
        border-left: 4px solid #e8d575;
    }

    .guide-cards {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;

        .guide-card {
            padding: 1.5rem;
            text-align: center;
            background: #fdfbf2;
            border-radius: 12px;
            transition: transform 0.3s ease;

            &:hover {
                transform: translateY(-5px);
            }

            h3 {
                color: #2c3e50;
                margin: 1rem 0;
                font-size: 1.2rem;
            }

            p {
                color: #666;
                line-height: 1.6;
                font-size: 1rem;
            }
        }
    }
}

@media (max-width: 768px) {
    .guide-cards {
        grid-template-columns: 1fr !important;
    }
}
</style>
