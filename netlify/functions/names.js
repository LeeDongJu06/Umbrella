exports.handler = async () => {
    const savedNames = ['이름1', '이름2']; // 예시 데이터

    return {
        statusCode: 200,
        body: JSON.stringify({ names: savedNames }),
    };
};
