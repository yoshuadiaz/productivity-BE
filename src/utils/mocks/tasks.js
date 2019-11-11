const tasksMock = [
  {
    id: 1,
    description: 'Teeth',
    duration: 93,
    timeRegistered: 87,
    status: 'completed',
    createdAt: '2018-11-03 12:28:33',
    updatedAt: '2019-07-28 09:25:47'
  },
  {
    id: 2,
    description: 'Win a Date with Tad Hamilton!',
    duration: 76,
    timeRegistered: 12,
    status: 'pending',
    createdAt: '2018-11-14 22:37:00',
    updatedAt: '2019-08-19 03:43:04'
  },
  {
    id: 3,
    description: 'Take Me Out to the Ball Game',
    duration: 47,
    timeRegistered: 73,
    status: 'pending',
    createdAt: '2019-07-20 08:30:07',
    updatedAt: '2018-11-26 12:39:42'
  },
  {
    id: 4,
    description: 'Mansion of Madness, The',
    duration: 104,
    timeRegistered: 2,
    status: 'pending',
    createdAt: '2019-10-03 11:22:31',
    updatedAt: '2019-10-23 18:53:49'
  },
  {
    id: 5,
    description: 'Villa Amalia',
    duration: 82,
    timeRegistered: 89,
    status: 'completed',
    createdAt: '2019-09-11 22:39:55',
    updatedAt: '2019-02-06 20:18:42'
  },
  {
    id: 6,
    description: 'Ballistic: Ecks vs. Sever',
    duration: 86,
    timeRegistered: 11,
    status: 'pending',
    createdAt: '2018-11-06 11:44:36',
    updatedAt: '2018-11-05 13:27:23'
  },
  {
    id: 7,
    description: 'Saints and Soldiers',
    duration: 110,
    timeRegistered: 47,
    status: 'completed',
    createdAt: '2019-05-07 17:20:08',
    updatedAt: '2019-06-11 11:50:53'
  },
  {
    id: 8,
    description: 'Eegah',
    duration: 18,
    timeRegistered: 85,
    status: 'completed',
    createdAt: '2019-02-01 02:54:23',
    updatedAt: '2019-01-15 14:03:18'
  },
  {
    id: 9,
    description: 'Path to War',
    duration: 46,
    timeRegistered: 94,
    status: 'completed',
    createdAt: '2018-12-01 04:48:46',
    updatedAt: '2018-11-05 15:22:40'
  },
  {
    id: 10,
    description: 'Foolproof',
    duration: 48,
    timeRegistered: 78,
    status: 'pending',
    createdAt: '2019-03-23 01:28:44',
    updatedAt: '2019-01-24 19:53:15'
  },
  {
    id: 11,
    description: '18 Again!',
    duration: 52,
    timeRegistered: 40,
    status: 'completed',
    createdAt: '2018-11-29 06:19:09',
    updatedAt: '2019-01-31 08:32:46'
  },
  {
    id: 12,
    description: 'Hellgate',
    duration: 8,
    timeRegistered: 1,
    status: 'pending',
    createdAt: '2018-10-16 12:31:21',
    updatedAt: '2019-01-19 07:01:47'
  },
  {
    id: 13,
    description: 'Breaking the Waves',
    duration: 68,
    timeRegistered: 18,
    status: 'pending',
    createdAt: '2019-03-10 07:12:17',
    updatedAt: '2019-07-15 13:40:39'
  },
  {
    id: 14,
    description: 'Mumford',
    duration: 44,
    timeRegistered: 69,
    status: 'completed',
    createdAt: '2019-02-18 14:40:56',
    updatedAt: '2019-04-29 17:44:09'
  },
  {
    id: 15,
    description: 'Sicilian Clan, The (Clan des Siciliens, Le)',
    duration: 48,
    timeRegistered: 92,
    status: 'pending',
    createdAt: '2019-09-28 16:29:06',
    updatedAt: '2019-09-08 00:50:13'
  },
  {
    id: 16,
    description: '12:08 East of Bucharest (A fost sau n-a fost?)',
    duration: 74,
    timeRegistered: 10,
    status: 'completed',
    createdAt: '2019-06-11 23:50:34',
    updatedAt: '2019-01-29 04:27:50'
  },
  {
    id: 17,
    description: 'Good-bye, My Lady',
    duration: 41,
    timeRegistered: 39,
    status: 'pending',
    createdAt: '2019-04-03 00:45:07',
    updatedAt: '2019-08-27 09:31:23'
  },
  {
    id: 18,
    description: 'I Bought a Vampire Motorcycle',
    duration: 43,
    timeRegistered: 21,
    status: 'pending',
    createdAt: '2018-10-16 10:46:46',
    updatedAt: '2019-09-03 18:03:42'
  },
  {
    id: 19,
    description: 'Castle, The',
    duration: 21,
    timeRegistered: 34,
    status: 'completed',
    createdAt: '2019-03-03 21:45:24',
    updatedAt: '2019-07-13 02:54:28'
  },
  {
    id: 20,
    description: 'Waiting for Forever',
    duration: 7,
    timeRegistered: 63,
    status: 'pending',
    createdAt: '2019-04-06 08:54:30',
    updatedAt: '2019-08-19 03:10:03'
  }
]

const filteredTaskMocks = (id) => {
  return tasksMock.filter(
    task => task.id === id
  )
}

const searchTaskMock = (status = null, search = null) => {
  return tasksMock.filter(task => {
    if (status && search) {
      return task.description.toLowerCase().search(search.toLocaleLowerCase()) >= 0 && task.status === status
    } else if (status) {
      return task.status === status
    } else if (search) {
      return task.description.toLowerCase().search(search.toLocaleLowerCase()) >= 0
    } else {
      return true
    }
  })
}

class TaskServiceMock {
  async getTasks (status = null, search = null) {
    return Promise.resolve(searchTaskMock(status, search))
  }

  async createTask () {
    return Promise(tasksMock[0])
  }
}

module.exports = {
  tasksMock,
  filteredTaskMocks,
  TaskServiceMock
}
