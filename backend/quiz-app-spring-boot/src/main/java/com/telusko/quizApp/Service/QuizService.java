package com.telusko.quizApp.Service;

import com.telusko.quizApp.dao.QuestionDao;
import com.telusko.quizApp.dao.QuizDao;
import com.telusko.quizApp.model.Question;
import com.telusko.quizApp.model.QuestionWrapper;
import com.telusko.quizApp.model.Quiz;
import com.telusko.quizApp.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.*;

@Service
public class QuizService {
    @Autowired
    QuizDao quizDao;
    @Autowired
    QuestionDao questionDao;

    @Transactional
    public ResponseEntity<Integer> createQuiz(String category, int numQ, String title) {

        List<Question> questions = questionDao.findRandomQuestionByCategory(category, numQ);

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestions(questions);

        Quiz savedQuiz = quizDao.saveAndFlush(quiz);


        return new ResponseEntity<>(savedQuiz.getId(), HttpStatus.CREATED);
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
        Optional<Quiz> quiz = quizDao.findById(id);
        List<Question> questionsFromDB = quiz.get().getQuestions();
        List<QuestionWrapper> questionForUser = new ArrayList<>();
        for(Question q : questionsFromDB){
            QuestionWrapper qw = new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
            questionForUser.add(qw);
        }
        return new ResponseEntity<>(questionForUser,HttpStatus.OK);
    }

    public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {

        Quiz quiz = quizDao.findById(id).get();
        List<Question> questions = quiz.getQuestions();

        Map<Integer, String> correctAnswers = new HashMap<>();
        for (Question q : questions) {
            correctAnswers.put(q.getId(), q.getRightAnswer());
        }

        int right = 0;
        for (Response response : responses) {
            String correct = correctAnswers.get(response.getId());
            if (correct != null && correct.equals(response.getResponse())) {
                right++;
            }
        }

        return new ResponseEntity<>(right, HttpStatus.OK);
    }

}
