import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

export default function Stats(props) {
  const { stats } = props

  const barStyles = (num) => {
    let color = '#ff3e3e'

    if (num > 49 && num < 80) {
      color = '#faad14'
    } else if (num >= 80) {
      color = '#00ac17'
    }

    return {
      ...styles.rangeBar,
      width: `${num > 100 ? 100 : num} %`,
      backgroundColor: color,
    }
  }

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Base Stats</Text>
      {stats.map((item) => (
        <View style={styles.block} key={item.stat.url}>
          <View style={styles.block_title}>
            <Text style={styles.stat_title}>{item.stat.name}</Text>
            {item.base_stat >= 100 && renderStar()}
          </View>
          <View style={styles.block_info}>
            <Text style={styles.info_text}>{item.base_stat}</Text>
            <View style={styles.bgBar}>
              <View style={barStyles(item.base_stat)}></View>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

function renderStar() {
  return <Image source={require('../../assets/star.png')} style={{ width: 15, height: 15 }} />
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    marginTop: 35,
    marginBottom: 60,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 15,
  },
  block: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  block_title: {
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat_title: {
    textTransform: 'capitalize',
    fontSize: 12,
    color: '#6b6b6b',
  },
  block_info: {
    width: '65%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info_text: {
    width: '20%',
    fontSize: 12,
    textAlign: 'center',
  },
  bgBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dedede',
    width: '80%',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  rangeBar: {
    opacity: 0.75,
    height: 6,
    borderRadius: 3,
  },
})
