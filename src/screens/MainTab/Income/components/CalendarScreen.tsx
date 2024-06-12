import { TextCus, TouchCus, ViewCus } from 'components';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from 'theme';
import {
  EnumTime,
  capitalizeFirstLetter,
  getCurrentMonthDays,
  getCurrentYearMonths,
  getWeeksInMonth,
} from 'utils';

// --------------
const CalendarScreen: React.FC<{ onDataSelected: (data: any) => void }> = ({
  onDataSelected = () => {},
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [selectedButton, setSelectedButton] = useState<
    EnumTime.DAY | EnumTime.WEEK | EnumTime.MONTH
  >(EnumTime.DAY);

  const renderDayCalendar = () => {
    const dayList = getCurrentMonthDays();
    return (
      <ViewCus flex-row>
        {dayList.map((day, index) => {
          const isActive = selectedIndex === index;
          return (
            <TouchCus
              key={index}
              style={[styles.dayContainer, isActive && styles.selectedItem]}
              onPress={() => {
                onDataSelected(day);
                setSelectedIndex(index); // Update selected index
              }}>
              <TextCus style={[isActive && styles.selectedText]}>
                {day.day}
              </TextCus>
              <TextCus style={[isActive && styles.selectedText]}>
                {day.weekday}
              </TextCus>
            </TouchCus>
          );
        })}
      </ViewCus>
    );
  };

  const renderWeekCalendar = () => {
    const weekList = getWeeksInMonth();
    return (
      <ViewCus flex-row>
        {weekList.map((week, index) => {
          const isActive = selectedIndex === index;
          return (
            <TouchCus
              key={index}
              style={[
                styles.weekInnerContainer,
                isActive && styles.selectedItem,
              ]}
              onPress={() => {
                onDataSelected({
                  month: week[0]?.format('MM'),
                  rangeDate: [
                    week[0]?.format('DD'),
                    week[week.length - 1]?.format('DD'),
                  ],
                });
                setSelectedIndex(index);
              }}>
              <TextCus style={[isActive && styles.selectedText]}>
                Tháng {week[0]?.format('MM')}
              </TextCus>
              <TextCus style={[isActive && styles.selectedText]}>
                {week[0]?.format('DD')}-{week[week.length - 1]?.format('DD')}
              </TextCus>
            </TouchCus>
          );
        })}
      </ViewCus>
    );
  };

  const renderMonthCalendar = () => {
    const monthList = getCurrentYearMonths();
    const currentYear = moment().year();

    return (
      <ViewCus flex-row>
        {monthList.map((month, index) => {
          const isActive = selectedIndex === index;
          return (
            <TouchCus
              key={index}
              style={[
                styles.monthContainer,
                selectedIndex === index && styles.selectedItem,
              ]}
              onPress={() => {
                onDataSelected(month);
                setSelectedIndex(index);
              }}>
              <TextCus style={[isActive && styles.selectedText]}>
                {capitalizeFirstLetter(month)}
              </TextCus>
              <TextCus style={[isActive && styles.selectedText]}>
                {currentYear}
              </TextCus>
            </TouchCus>
          );
        })}
      </ViewCus>
    );
  };

  const renderCalendar = () => {
    switch (selectedButton) {
      case EnumTime.DAY:
        return renderDayCalendar();
      case EnumTime.WEEK:
        return renderWeekCalendar();
      case EnumTime.MONTH:
        return renderMonthCalendar();
      default:
        return null;
    }
  };

  const onPressTab = (tab: EnumTime.DAY | EnumTime.WEEK | EnumTime.MONTH) => {
    setSelectedButton(tab);
    setSelectedIndex(null);
  };

  return (
    <ViewCus style={{}}>
      <ViewCus style={styles.buttonContainer}>
        <TouchCus
          style={[
            styles.button,
            selectedButton === EnumTime.DAY && styles.buttonSelected,
          ]}
          onPress={() => onPressTab(EnumTime.DAY)}>
          <TextCus
            style={[selectedButton === EnumTime.DAY && styles.textSelected]}
            py-8
            colors-grey85>
            Ngày
          </TextCus>
        </TouchCus>
        <TouchCus
          style={[
            styles.button,
            selectedButton === EnumTime.WEEK && styles.buttonSelected,
          ]}
          onPress={() => onPressTab(EnumTime.WEEK)}>
          <TextCus
            py-8
            style={[selectedButton === EnumTime.WEEK && styles.textSelected]}>
            Tuần
          </TextCus>
        </TouchCus>
        <TouchCus
          style={[
            styles.button,
            selectedButton === EnumTime.MONTH && styles.buttonSelected,
          ]}
          onPress={() => onPressTab(EnumTime.MONTH)}>
          <TextCus
            style={[selectedButton === EnumTime.MONTH && styles.textSelected]}
            py-8>
            Tháng
          </TextCus>
        </TouchCus>
      </ViewCus>
      <ViewCus style={styles.boxCalendar}>{renderCalendar()}</ViewCus>
    </ViewCus>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  buttonSelected: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.main,
    borderBottomWidth: 1,
  },
  textSelected: {
    color: Colors.main,
  },
  dayContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.greyEE,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 75,
    width: '20%',
    height: 56,
  },
  weekInnerContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.greyEE,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 56,
  },
  monthContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.greyEE,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 56,
  },
  boxCalendar: {
    // backgroundColor: 'red',
  },
  selectedItem: {
    borderBottomColor: Colors.main,
    borderBottomWidth: 1,
  },
  selectedText: {
    color: Colors.main,
  },
});

export default CalendarScreen;
