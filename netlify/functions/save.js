exports.handler = async (event) => {
    if (event.httpMethod === 'POST') {
        const { names } = JSON.parse(event.body);
        // 실제로는 데이터베이스에 저장하거나 파일에 기록해야 함
        console.log('저장된 이름:', names);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: '저장 성공' }),
        };
    }
    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method not allowed' }),
    };
};
