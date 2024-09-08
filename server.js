// Express 웹 프레임워크
const express = require('express');            

// 세션 관리를 위한 미들웨어
const session = require('express-session');    

// 파일 경로 처리를 위한 기본 Node.js 모듈
const path = require('path');                  

// 환경 변수 관리를 위한 라이브러리
const dotenv = require('dotenv');              

// Supabase 클라이언트
const { createClient } = require('@supabase/supabase-js'); 


// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// .env 파일에서 환경 변수를 불러오기
dotenv.config();

// Express 애플리케이션 인스턴스를 생성
const app = express();

// 포트 설정 
const port = process.env.PORT || 8080;

// EJS 템플릿 엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('views', path.join(__dirname, 'views')); // views 디렉토리 설정

// 정적 파일을 제공하기 위한 경로 설정 (예: CSS, JS 파일)
app.use(express.static(path.join(__dirname, 'public')));

// POST 요청에서 JSON 및 URL-encoded 데이터 처리를 위한 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 세션 설정
app.use(session({
  secret: process.env.SESSION_SECRET || 'mySecret', // 세션 보안을 위한 비밀키
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // HTTPS 사용 시 true로 설정 (개발 환경에서는 false)
}));

// Supabase 클라이언트 설정 (환경 변수에서 URL과 키를 가져옵니다)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// 첫 페이지 GET 요청 라우트
app.get('/', async (요청, 응답) => {
    try {
        const { data, error } = await supabase
        .from('users') // 'users' 테이블에서
        .select('*'); // 모든 필드를 선택 (SQL의 SELECT * 과 동일)
    
        if (error) {
            throw error; // 에러가 발생하면 catch 블록으로 넘어감
        }

        응답.render('index', { users: data }); // 데이터를 성공적으로 가져왔다면, 'list' 템플릿을 렌더링하고 users 데이터를 템플릿에 전달
    } catch (error) {
        
        응답.status(500).json({ error: error.message }); // 에러 발생 시, 500 상태 코드와 함께 에러 메시지를 JSON으로 반환
    } 
});


// /about GET 요청 라우트
app.get('/about', async (요청, 응답) => {
    try {
        const { data, error } = await supabase
        .from('users') // 'users' 테이블에서
        .select('*'); // 모든 필드를 선택 (SQL의 SELECT * 과 동일)
    
        if (error) {
            throw error; // 에러가 발생하면 catch 블록으로 넘어감
        }

        응답.render('about', { users: data }); // 데이터를 성공적으로 가져왔다면, 'list' 템플릿을 렌더링하고 users 데이터를 템플릿에 전달
    } catch (error) {
        
        응답.status(500).json({ error: error.message }); // 에러 발생 시, 500 상태 코드와 함께 에러 메시지를 JSON으로 반환
    } 
});



// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------


// 서버 시작
app.listen(8080, () => {
    console.log('💗🍀🥰🪄✨ http://localhost:8080 에서 서버가 정상적으로 실행 중이라서 완전 럭키비키잖아 ✨🪄🥰🍀💗')
})