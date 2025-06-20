<template>
    <div class="hotline-list">
        <div v-for="(hotline, index) in hotlines" :key="index" class="hotline-item">
            <div class="province">{{ hotline.province }}</div>
            <div class="number">{{ hotline.number }}</div>
            <div class="note">{{ hotline.note }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const hotlines = [
    { province: '共青团中央', number: '12355', note: '青少年服务台' },
    { province: '国家卫生健康委', number: '12356', note: '全国统一心理援助热线' },
    { province: '河北省', number: '0311-67991120', note: '河北省心理援助热线' },
    { province: '山西省', number: '0351-4639459', note: '山西省精神卫生中心' },
    { province: '辽宁省', number: '024-23813000', note: '辽宁省心理危机干预中心' },
    { province: '吉林省', number: '0431-89685000', note: '吉林省心理援助热线' },
    { province: '黑龙江省', number: '0451-87270120', note: '黑龙江省心理援助热线' },
    { province: '江苏省', number: '025-83712977', note: '南京心理援助热线' },
    { province: '浙江省', number: '0571-85029595', note: '浙江省心理援助热线' },
    { province: '安徽省', number: '0551-63666903', note: '安徽省心理危机干预中心' },
    { province: '福建省', number: '0591-85666661', note: '福建省心理援助热线' },
    { province: '江西省', number: '0791-88330120', note: '江西省心理援助热线' },
    { province: '山东省', number: '0531-88942284', note: '山东省精神卫生中心' },
    { province: '河南省', number: '0373-7095888', note: '河南省心理援助热线' },
    { province: '湖北省', number: '027-85844666', note: '湖北省心理援助热线' },
    { province: '湖南省', number: '0731-85292999', note: '湖南省心理援助热线' },
    { province: '广东省', number: '020-81899120', note: '广州市心理援助热线' },
    { province: '海南省', number: '0898-96363', note: '海南省心理援助热线' },
    { province: '四川省', number: '028-87577510', note: '四川省心理援助热线' },
    { province: '贵州省', number: '0851-88417888', note: '贵州省心理危机干预中心' },
    { province: '云南省', number: '0871-65011111', note: '云南省心理援助热线' },
    { province: '陕西省', number: '029-63666911', note: '陕西省心理援助热线' },
    { province: '甘肃省', number: '0931-4638858', note: '甘肃省心理援助热线' },
    { province: '青海省', number: '0971-8140371', note: '青海省第三人民医院' },
    { province: '中国台湾省', number: '1925', note: '台湾地区安心专线' }
];
</script>

<style lang="scss" scoped>
.hotline-list {
    padding: 0.8em;
    max-height: 460px;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: #E8D575;
        border-radius: 3px;
    }

    .hotline-item {
        padding: 12px 15px;
        margin-bottom: 8px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background: rgba(232, 213, 117, 0.1);
        }

        .province {
            font-size: 1.3em;
            font-weight: 500;
            color: #2c3e50;
            margin-bottom: 4px;
        }

        .number {
            font-size: 1.4em;
            color: #E8D575;
            font-weight: bold;
            margin-bottom: 4px;
            letter-spacing: 0.5px;
        }

        .note {
            font-size: 1.1em;
            color: #666;
        }
    }
}
</style>