import { ChangeEvent, useState } from 'react';
import { Label } from '@components/atoms/label/Label';
import { SkillSelector } from '@components/domain/SkillSelector';
import { Input } from '@components/ui/Input/Input';
import { Select } from '@components/ui/Select/Select';
import VerticalLine from '@assets/recentLine.svg';

import './createStudy.scss';

const select = {
  personnel: '모집인원',
  term: '진행기간',
  language: '모집언어',
  process: '진행방식',
  contact: '연락방식',
};

export const CreateStudy = () => {
  return (
    <div className="studypage_container">
      <section>배너섹션</section>
      <DefaultForm />
    </div>
  );
};

const DefaultForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [form, setForm] = useState({});

  const onChangeByInput = (e: ChangeEvent<HTMLInputElement>) =>
    // 숫자만 들어오게 해야한다.
    setInputValue(e.target.value);
  return (
    <section>
      <h1>스터디 개설하기</h1>
      <p>개설하려는 스터디의 정보를 입력해 주세요.</p>
      <div>---</div>
      {Object.values(select).map((value) => {
        if (value === '모집인원')
          return (
            <Input
              type="number"
              placeholder="최소 1명 ~ 최대 15명"
              className="studypage_input"
              top={<Label text={value} />}
              leftValue={
                <img src={VerticalLine} className="vertical_line" alt="|" />
              }
              value={inputValue}
              onChange={onChangeByInput}
            />
          );
        if (value === '진행방식') return <SkillSelector />;
        return (
          <Select
            key={value}
            label={<Label text={value} />}
            value={[]}
            trigger={<button>오픈</button>}
            onChange={() => console.log(123)}
            options={['JavaScript', 'React', 'Nextjs']}
          />
        );
      })}
    </section>
  );
};
