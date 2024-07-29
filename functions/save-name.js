const fs = require('fs');
const path = require('path');
const { parse } = require('json2csv');

const csvPath = path.join(__dirname, '../data.csv');

exports.handler = async function(event, context) {
    if (event.httpMethod === 'POST') {
        try {
            const { name } = JSON.parse(event.body);

            if (!name) {
                return {
                    statusCode: 400,
                    body: '이름을 입력해야 합니다.'
                };
            }

            // CSV 파일이 없으면 생성
            if (!fs.existsSync(csvPath)) {
                fs.writeFileSync(csvPath, 'Name\n');
            }

            // 현재 CSV 파일 내용 읽기
            const csvData = fs.readFileSync(csvPath, 'utf-8');
            const rows = csvData.split('\n').filter(row => row.trim() !== '');
            const csvObjects = rows.slice(1).map(row => ({ Name: row }));
            csvObjects.push({ Name: name });

            // CSV로 변환
            const csv = parse(csvObjects, { header: true });

            // CSV 파일에 저장
            fs.writeFileSync(csvPath, csv);

            return {
                statusCode: 200,
                body: '이름이 저장되었습니다.'
            };
        } catch (error) {
            console.error(error);
            return {
                statusCode: 500,
                body: '서버 오류'
            };
        }
    } else {
        return {
            statusCode: 405,
            body: '허용되지 않는 메소드'
        };
    }
};
