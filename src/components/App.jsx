import { Component } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistic from './Statistics/Statistics';
import Notification from './Notification/Notification';
import css from './App.module.css';


class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  }

  //робимо стрілку, щоб прив'язати this
  //у стрілки контекст з'являється в момент створення
  //у стрілки немає свого контекста, тому вона забирає його від батька
  
  onBtnClicked = option => 
    this.setState(prevState => ({ [option]: prevState[option] + 1 }))

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  }

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();
    const options = Object.keys(this.state);

    return (
      <div className={css.container}>
        <Section title="Please Leave feedback">
          <FeedbackOptions options={options} onLeaveFeedback={this.onBtnClicked} />
        </Section>

        <Section title="Statistics">
          {total !== 0 ? (
            <Statistic good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage} />
          ) : (
            <Notification message="There is no feedback" />
          )
          }
        </Section>
      </div>
    )
  }
}

export default App;