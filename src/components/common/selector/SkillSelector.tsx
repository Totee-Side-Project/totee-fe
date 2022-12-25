import { MouseEvent, ReactNode, useEffect, useState } from 'react';

import { Circle, SelectItem } from '@components/atoms';
import { SkillIcon } from '@components/atoms/SkillIcon/SkillIcon';
import icon from '@components/atoms/svg';
import classes from './skillSelector.module.scss';

export type stringKeyStringListValueType = { [key: string]: string[] };
export type stringKeyBooleanValueType = { [key: string]: boolean };

// TODO: hooks로 분리할 예정입니다.
const skillList: stringKeyStringListValueType = {
  프론트엔드: ['JavaScript', 'Nextjs', 'React', 'Svelte', 'TypeScript'],
  백엔드: [
    'Django',
    'Express',
    'Firebase',
    'Go',
    'GraphQL',
    'Java',
    'Kotlin',
    'MongoDB',
    'MySQL',
    'Nestjs',
    'Nodejs',
    'php',
    'Python',
    'Spring',
  ],
  모바일: ['Flutter', 'Kotlin', 'ReactNative', 'Swift', 'Unity'],
  기타: ['AWS', 'C', 'Docker', 'Figma', 'Git', 'Jest', 'Kubernetes', 'Zeplin'],
};

const getSkillObject = (
  skillList: stringKeyStringListValueType,
  selectedSkillList: string[],
): { [key: string]: { [key: string]: boolean } } => {
  const booleanObjectList = getBooleanObjectList(skillList, selectedSkillList);
  return reduceObjectWithArray(skillList, booleanObjectList);
};

const getBooleanObjectList = (
  object: stringKeyStringListValueType,
  list: string[],
) => {
  return Object.entries(object).map(([key, value]) => {
    const result: stringKeyBooleanValueType = {};
    value.forEach((key) => {
      if (list.includes(key)) return (result[key] = true);
      result[key] = false;
    });
    return result;
  });
};

const reduceObjectWithArray = (
  object: {},
  array: stringKeyBooleanValueType[],
) => {
  return Object.keys(object).reduce(
    (acc, value, index) => ({ ...acc, [value]: array[index] }),
    {},
  );
};
const categories = ['프론트엔드', '백엔드', '모바일', '기타'];

const getSelectedFilter = (
  object: stringKeyStringListValueType,
  list: string[] = ['123'],
) => {
  for (const [key, value] of Object.entries(object)) {
    if (value.includes(list[0])) return key;
  }
  return '';
};

interface Props {
  initialState: string[];
  onChangeArray: (data: (undefined | string)[]) => void;
  top?: ReactNode;
}

export const SkillSelector = ({ initialState, onChangeArray, top }: Props) => {
  const filterString = getSelectedFilter(skillList, initialState);
  const [selectedFilter, setSelectedFilter] = useState(
    filterString || categories[0],
  );
  const [skills, setSkills] = useState(getSkillObject(skillList, initialState));

  useEffect(() => {
    setSkills((state) => ({
      ...state,
      ...getSkillObject(skillList, initialState),
    }));
  }, [initialState]);

  const onClickFilterItem = (
    e: MouseEvent<HTMLUListElement | HTMLLIElement>,
  ) => {
    if (e.currentTarget === e.target) return;
    const target = e.target as HTMLLIElement;
    setSelectedFilter(target.innerText);
  };

  const onClickSkillItem = (
    e: MouseEvent<HTMLUListElement | HTMLLIElement>,
  ) => {
    const currentTaget = e.currentTarget;
    const dataValue = currentTaget.getAttribute('data-value');
    if (!dataValue) return;
    if (initialState.includes(dataValue)) {
      onChangeArray([...initialState.filter((skill) => skill !== dataValue)]);
      return;
    }
    onChangeArray([...initialState, dataValue]);
  };

  return (
    <div className={classes.skill_selector_container}>
      {top}
      <Categories selectedFilter={selectedFilter} onClick={onClickFilterItem} />
      <div className={classes.selector_background}>
        <Selector
          filteredSkills={skills[selectedFilter]}
          selectedSkiilsTypeObject={skills[selectedFilter]}
          onClick={onClickSkillItem}
        />
      </div>
    </div>
  );
};

interface CategoriesProps {
  selectedFilter: string | undefined;
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const Categories = ({ selectedFilter, onClick }: CategoriesProps) => {
  return (
    <ul className={classes.category_wrap} onClick={onClick}>
      {categories.map((category, index) => (
        <li
          className={
            category === selectedFilter
              ? classes.category_item + ' ' + classes.select
              : classes.category_item
          }
          key={category + index}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

interface SelectorProps {
  filteredSkills: stringKeyBooleanValueType;
  selectedSkiilsTypeObject: { [key: string]: boolean };
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const Selector = ({
  filteredSkills,
  selectedSkiilsTypeObject,
  onClick,
}: SelectorProps) => {
  return (
    <ul className={classes.select_item_wrap}>
      {Object.keys(filteredSkills).map((skill, index) => (
        <SkillItem
          key={skill + index}
          dataValue={skill}
          isSelect={selectedSkiilsTypeObject[skill]}
          src={icon[skill]}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

interface SkillItemProps {
  // children: ReactNode;
  dataValue: string;
  isSelect: boolean;
  src: string;
  onClick: (e: MouseEvent<HTMLUListElement | HTMLLIElement>) => void;
}
const SkillItem = ({ dataValue, isSelect, src, onClick }: SkillItemProps) => {
  return (
    <li
      className={isSelect ? 'select' : ''}
      onClick={onClick}
      data-value={dataValue}
    >
      <SelectItem
        left={<Circle selected={isSelect} backgroundColor="#7BA364" />}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <SkillIcon src={src} alt={dataValue} />
            <div>{dataValue}</div>
          </div>
        </div>
      </SelectItem>
    </li>
  );
};
